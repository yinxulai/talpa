import { PNG } from 'pngjs'
import { log } from'../utils'
import { DecodeResult } from './index'
import { sendEvent } from '../../anys'

export async function PNGDecode(data: Buffer): Promise<DecodeResult> {
  log('PNG 格式图片解码')
  sendEvent('decode', 'PNGDecode')
  const imgData = PNG.sync.read(data)
  return { ...imgData }
}
