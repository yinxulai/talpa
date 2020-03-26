import { PNGEncode } from './png'
import { JPEGEncode } from './jpeg'
import * as t from '../../../typings/convert'
import { SupportedEncodeMimeType } from '../../../typings/format'

export interface ImageEncodeOptions {
  data: Buffer,
  width: number,
  height: number
}

// 编码成输出指定格式
export async function encode(format: SupportedEncodeMimeType, image: ImageEncodeOptions, options: & t.EncodeOptions): Promise<Buffer> {

  if (format === SupportedEncodeMimeType.JPEG) {
    return await JPEGEncode(image, options)
  }

  if (format === SupportedEncodeMimeType.PNG) {
    return await PNGEncode(image, options)
  }

  throw new Error('不支持的文件格式')
}
