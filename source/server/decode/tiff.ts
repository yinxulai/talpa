import * as utif from 'utif'
import { log } from'../utils'
import { DecodeResult } from './index'

export async function TIFFDecode(data: Buffer): Promise<DecodeResult> {
  log('TIFF 格式图片解码')
  const ifds = utif.decode(data)
  utif.decodeImage(data, ifds[0])
  return {...ifds[0]}
}
