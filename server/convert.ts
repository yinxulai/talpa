import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'
import jpegJs from 'jpeg-js'
import heic from 'heic-decode'
import { Format } from '../typings/format'
import { readFile, writeFile, log } from './utils'

interface ImageEncodeOptions {
  data: Buffer,
  width: number,
  height: number
}

interface JPEGEncodeOptions {
  quality?: number
}

interface PNGEncodeOptions {
}

type EncodeOptions = PNGEncodeOptions | JPEGEncodeOptions

// JPEG 编码
async function JPEGEncode(options: JPEGEncodeOptions & ImageEncodeOptions): Promise<Buffer> {
  log('将数据按 JPEG 格式进行编码')
  const { data, width, height, quality = 100 } = options
  return jpegJs.encode({ data, width, height }, quality).data
}

// PNG 编码
async function PNGEncode(options: JPEGEncodeOptions & ImageEncodeOptions): Promise<Buffer> {
  log('将数据按 PNG 格式进行编码')
  const { data, width, height } = options
  const png = new PNG({ width, height });

  png.data = data;

  return PNG.sync.write(png, {
    deflateLevel: 9,
    deflateStrategy: 3,
    filterType: -1,
    colorType: 6,
    inputHasAlpha: true
  });
}

interface DecodeResult {
  width: number,
  height: number,
  data: Buffer
}

// HEIC 解码
async function HEICDecode(data: Buffer): Promise<DecodeResult> {
  log('HEIC 格式图片解码')
  const result = await heic({ buffer: data })
  return { ...result, data: Buffer.from(result.data) }
}

// TODO: HEIC 解码，解码 HEIC 里的全部图片
async function HEICAllDecode(data: Buffer): Promise<any> {
  return await heic.all({ buffer: data })
}

export interface ConvertOptions {
  srcPath: string // 源文件路径
  outPath?: string // 输出文件路径 默认相同位置
  outFormat?: Format // 输出格式
  outOptions?: EncodeOptions // 输出配置
}

// 转换方法
export default async function convert(options: ConvertOptions) {
  let { srcPath, outPath, outFormat } = options

  if (!fs.existsSync(srcPath)) {
    log(srcPath, '文件不存在')
    throw new Error('文件不存在')
  }

  // 如果没有设置输出格式
  if (!outFormat) { // 默认使用 PNG
    outFormat = Format.PNG
    log('未设置导出格式，默认使用 PNG')
  }

  // 如果输出目录不存在
  if (!outPath) { // 输出到源文件相同目录
    log('使用输入目录作为输出目录')
    const extnamel = path.extname(srcPath).length || 0
    outPath = `${srcPath.slice(0, srcPath.length - extnamel)}.${outFormat}`
  }

  // 处理转换
  let outBuffer;
  const file = await readFile(srcPath)
  const srcData = await HEICDecode(file)
  if (outFormat === Format.JPEG) {
    outBuffer = await JPEGEncode({ ...srcData })
    await writeFile(outBuffer, outPath)
  }

  if (outFormat === Format.PNG) {
    outBuffer = await PNGEncode({ ...srcData })
    await writeFile(outBuffer, outPath)
  }

  log('处理完成')
}
