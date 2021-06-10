import React from 'react'
import ReactDOM from 'react-dom'
import { ipcRenderer } from 'electron'
import { Drag } from './componet/drag'
import * as Sentry from '@sentry/electron'
import { Header } from './componet/header'
import { Exports } from './componet/exports'
import { Progress } from './componet/progress'
import { initGA, initSentry, sendView, sendEvent } from '../anys'
import { ConvertOptions, ConvertResult } from '../../typings/convert'
import { Toaster, warning, success, error } from 'react-pitaya/lib/helper/toaster'
import { SupportedEncodeMimeType, SupportedDecodeMimeType } from '../../typings/format'

import styles from './index.less'

initGA()
initSentry()

Sentry.captureException(new Error('test'))

enum AppState {
  Converting = 'Converting', // 转换中
  WaitingFile = 'WaitingFile', // 等待文件
  ConversionCompleted = 'ConversionCompleted' // 转换完成
}

// 单个文件转换
export async function convert(options: ConvertOptions): Promise<ConvertResult> {
  return ipcRenderer.invoke('convert', options)
}

// 是否是支持输入的文件格式
function isDecodeSupported(type: string): boolean {
  const types = Object.values(SupportedDecodeMimeType as Record<string, any>)
  const supported = types.includes(type)

  if (!supported) { // 不支持的上报一下
    sendEvent('notDecodeSupportedMimeType', type)
  }

  return supported
}

// 是否是支持转出的格式
// function isEncodeSupported(type: string): boolean {
//   const types = Object.values(SupportedEncodeMimeType as Object)
//   return types.includes(type)
// }

const App = () => {
  // 状态相关
  const [progress, setProgress] = React.useState([0, 0, 0])
  const [state, setState] = React.useState(AppState.WaitingFile)
  const isState = (...states: AppState[]) => states.includes(state)
  const [exportType, setExportType] = React.useState(SupportedEncodeMimeType.WEBP)

  // 统计
  const setStateWithAnys: typeof setState = (value) => {
    sendView(`/?state=${value.toString()}`)
    return setState(value)
  }


  // 转换处理
  const handleFile = async (files: File[]) => {
    const supportedFiles = files.filter(file => isDecodeSupported(file.type))
    warning(`累计发现 ${supportedFiles.length} 个文件可进行转换。`)
    setProgress([supportedFiles.length, 0, 0])
    setStateWithAnys(AppState.Converting)

    for (let index = 0; index < supportedFiles.length; index++) {
      const file = supportedFiles[index]
      const result = await convert({ srcPath: file.path, outFormat: exportType })

      if (result.error) {
        error(`文件 ${file.name} 处理失败, ${result.error}`)
        setProgress([supportedFiles.length, progress[1], ++progress[2]])
      } else {
        setProgress([supportedFiles.length, ++progress[1], progress[2]])
      }
    }

    progress[1] && success(`成功转换了 ${progress[1]} 个文件`)
    setStateWithAnys(AppState.ConversionCompleted)
    setProgress([0, 0, 0])
  }

  return (
    <>
      <Header title="Talpa" />
      <Toaster stack={false} />
      <div className={styles.app}>
        {
          // 选择文件状态
          isState(AppState.WaitingFile, AppState.ConversionCompleted) &&
          (<Drag onSelect={handleFile} />)
        }
        { // 导出格式选择
          isState(AppState.WaitingFile, AppState.ConversionCompleted) &&
          (<Exports value={exportType} onSelect={setExportType} />)
        }
        { // 转换中状态
          isState(AppState.Converting) &&
          (<Progress total={progress[0]} completed={progress[1]} failure={progress[2]} />)
        }
      </div>
    </>
  )
}


// 启动热更新
if (module.hot) { module.hot.accept() }
ReactDOM.render(<App />, document.getElementById('app'))
