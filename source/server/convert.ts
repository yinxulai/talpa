import fs from 'fs'
import path from 'path'
import { encode } from './encode'
import { decode, DecodeResult, Result } from './decode'
import { readFile, writeFile, log } from './utils'
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
  }

  // 如果输出目录不存在
  if (!outPath) { // 输出到源文件相同目录
    log('使用输入目录作为输出目录')
    const newExtname = outFormat.split('/')[1]
    const extnamel = path.extname(srcPath).length || 0
    outPath = `${srcPath.slice(0, srcPath.length - extnamel)}.${newExtname}`
  }

  // 读取文件
  let file
  try { file = await readFile(srcPath) }
  catch { return { error: '读取文件失败' } }

  // 解码文件
  let decodeData: DecodeResult
  try { decodeData = await decode(file) }
  catch (err) { return { error: '文件解码失败' } }

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
    try { encodeData = await encode(outFormat, data, {...outOptions}) }
    catch (err) { return { error: '文件解码失败' } }

    // 写出文件
    try { await writeFile(encodeData, outPath) }
    catch { return { error: '保存文件发生错误' } }
  }

  log('处理完成')
  return {}
}
