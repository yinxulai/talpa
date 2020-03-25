import jpegJs from 'jpeg-js'
import { log } from'../utils'
import { ImageEncodeOptions } from './index'

export interface JPEGEncodeOptions {
  quality?: number
}

// JPEG 编码
export async function JPEGEncode(image: ImageEncodeOptions, options: JPEGEncodeOptions): Promise<Buffer> {
  log('将数据按 JPEG 格式进行编码')
  const { data, width, height } = image
  const { quality = 100 } = options || {}
  const result = jpegJs.encode({ data, width, height }, quality)
  return result.data
}
