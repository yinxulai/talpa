import { ipcRenderer } from 'electron'
import { ConvertOptions } from '../../server/convert'

// 单个文件转换
export async function convert(options: ConvertOptions) {
  return ipcRenderer.invoke('convert', options)
}

