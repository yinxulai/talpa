import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { encode } from './encode'
import { readFile, writeFile, log } from './utils'
import { sendException, sendEvent } from '../anys'
import { decode, DecodeResult, Result } from './decode'
import { SupportedEncodeMimeType } from '../../typings/format'
import { ConvertOptions, ConvertResult } from '../../typings/convert'

// 转换方法
export default async function convert(options: ConvertOptions): Promise<ConvertResult> {
  let { outPath, outFormat } = options
  const { srcPath, outOptions } = options
  const { encodeSequence = false } = { ...outOptions }

  if (!fs.existsSync(srcPath)) {
    log(srcPath, '文件不存在')
    return { error: '文件不存在' }
  }

  // 如果没有设置输出格式
  if (!outFormat) { // 默认使用 PNG
    log('未设置导出格式，默认使用 PNG')
    outFormat = SupportedEncodeMimeType.PNG
    sendEvent('convert', 'setDafaultOutFormatToPNG')
  }

  // 如果输出目录不存在
  if (!outPath) { // 输出到源文件相同目录
    log('使用输入目录作为输出目录')
    const newExtname = outFormat.split('/')[1]
    const extnamel = path.extname(srcPath).length || 0
    outPath = `${srcPath.slice(0, srcPath.length - extnamel)}.${newExtname}`
    sendEvent('convert', 'setOutPathToSrcPath')
  }

  // 读取文件
  let file
  try {
    file = await readFile(srcPath)
    sendEvent('convert', 'readFile')
  } catch (err) {
    sendException(err)
    return { error: '读取文件失败' }
  }

    // 如果输出为webp文件
    if(outFormat === SupportedEncodeMimeType.WEBP){
      log('处理webp文件')
      const data = await sharp(file).webp({ lossless: true }).toBuffer()

      // 写出文件
      try {
        await writeFile(data, outPath)
        sendEvent('convert', 'writeFile')
      } catch (err) {
        sendException(err)
        return { error: '保存文件发生错误' }
      }
    } else {
      log('处理非webp文件')

      // 解码文件
      let decodeData: DecodeResult
      try {
        decodeData = await decode(file)
        sendEvent('convert', 'decode')
      } catch (err) {
        sendException(err)
        return { error: '文件解码失败' }
      }

      // TODO: 这里可以做一些压缩等操作

      const encodeQueue: Result[] = []

      if (Array.isArray(decodeData)) {
        if (encodeSequence) {
          encodeQueue.concat(decodeData)
        } else {
          encodeQueue.push(decodeData[0])
        }
      } else {
        encodeQueue.push(decodeData)
      }

      for (const data of encodeQueue) {
        // 编码文件
        let encodeData: Buffer
        try {
          encodeData = await encode(outFormat, data, { ...outOptions })
          sendEvent('convert', 'encode')
        } catch (err) {
          sendException(err)
          return { error: '文件编码失败' }
        }

        // 写出文件
        try {
          await writeFile(encodeData, outPath)
          sendEvent('convert', 'writeFile')
        } catch (err) {
          sendException(err)
          return { error: '保存文件发生错误' }
        }
      }
    }

  sendEvent('convert', 'done')
  log('处理完成')
  return {}
}
