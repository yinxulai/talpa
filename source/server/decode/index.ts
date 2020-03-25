import { SupportedDecodeMimeType } from '../../../typings/format'
import { fromBuffer } from 'file-type'
import { HEICDecode } from './heic'
import { JPEGDecode } from './jpeg'
import { TIFFDecode } from './tiff'
import { PNGDecode } from './png'
import { GIFDecode } from './gif'

export interface Result {
  width: number,
  height: number,
  data: Buffer
}

export type DecodeResult = Result | Array<Result>

// 解码
export async function decode(data: Buffer): Promise<DecodeResult> {
  // 解析图片格式（不以后缀名为准）
  const fileTypeResult = await fromBuffer(data)
  
  if (fileTypeResult == null) {
    throw new Error('不支持的文件格式')
  }

  const { mime } = fileTypeResult

  if (mime === SupportedDecodeMimeType.HEIC) {
    return HEICDecode(data)
  }
  if (mime === SupportedDecodeMimeType.JPEG) {
    return JPEGDecode(data)
  }
  if (mime === SupportedDecodeMimeType.PNG) {
    return PNGDecode(data)
  }

  if (mime === SupportedDecodeMimeType.TIFF) {
    return TIFFDecode(data)
  }

  if (mime === SupportedDecodeMimeType.GIF) {
    return GIFDecode(data)
  }

  throw new Error('不支持的文件格式')
}
