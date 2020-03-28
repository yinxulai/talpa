import omggif from 'omggif'
import { log } from '../utils'
import { Buffer } from 'buffer'
import { sendEvent } from '../../anys'
import { DecodeResult } from './index'

interface GifReader {
  width: number,
  height: number,
  numFrames: () => number,
  loopCount: Function,
  frameInfo: Function,
  decodeAndBlitFrameBGRA: Function,
  decodeAndBlitFrameRGBA: Function
}

// GIF 解码
export async function GIFDecode(data: Buffer): Promise<DecodeResult> {
  log('GIF 格式图片解码')
  sendEvent('decode', 'GIFDecode')

  const image: GifReader = new omggif.GifReader(data)
  if (!image) {
    throw new Error('GIF 格式图片解码失败')
  }

  const frameNumber = image.numFrames()

  return new Array(frameNumber).fill(null).map((_, index) => {
    const info = image.frameInfo(index)
    const pixels = new Uint8Array(info.width * info.height * 4)
    image.decodeAndBlitFrameRGBA(index, pixels)
    return { ...info, data: Buffer.from(pixels) }
  })
}
