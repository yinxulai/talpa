import jpegJs from 'jpeg-js'
import { log } from '../utils'
import { sendEvent } from '../../anys'
import { DecodeResult } from '.'

export async function JPEGDecode(data: Buffer): Promise<DecodeResult> {
  log('JPEG 格式图片解码')
  sendEvent('decode', 'JPEGDecode')
  const image = jpegJs.decode(data)
  return { ...image }
}
