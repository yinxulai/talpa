import omggif from 'omggif'
import { log } from '../utils'
import { Buffer } from 'buffer'
import { DecodeResult } from './index'

// GIF 解码
export async function GIFDecode(data: Buffer): Promise<DecodeResult> {
  log('GIF 格式图片解码')
  const image = new omggif.GifReader(data)
  const info = image.frameInfo(0)
  const pixels = new Uint8Array(info.width * info.height * 4)
  image.decodeAndBlitFrameRGBA(0, pixels)
  return { ...info, data: Buffer.from(pixels) }
}
