import { SupportedEncodeMimeType } from "./format"
import { PNGEncodeOptions } from '../source/server/encode/png'
import { JPEGEncodeOptions } from '../source/server/encode/jpeg'

export type EncodeOptions =
  | PNGEncodeOptions
  | JPEGEncodeOptions

interface BaseOutOptions {
  // 对于一些格式（例如 gif） 内包含多张图片
  //  这个选项用于控制是否将这些图片全部导出
  encodeSequence: boolean
}

export interface ConvertOptions {
  srcPath: string // 源文件路径
  outPath?: string // 输出文件路径 默认相同位置
  outFormat?: SupportedEncodeMimeType // 输出格式
  outOptions?: BaseOutOptions & EncodeOptions // 输出配置
}

export interface ConvertResult {
  error?: string
}
