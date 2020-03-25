import { PNG } from 'pngjs'
import { DecodeResult } from './index'
import { log } from'../utils'

export async function PNGDecode(data: Buffer): Promise<DecodeResult> {
  log('PNG 格式图片解码')
  const imgData = PNG.sync.read(data)
  return { ...imgData }
}
