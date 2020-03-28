import { log } from'../utils'
import heic from 'heic-decode'
import { DecodeResult } from './index'
import { sendEvent } from '../../anys'


// HEIC 解码，解码 HEIC 里的全部图片
// async function HEICAllDecode(data: Buffer): Promise<any> {
//   return await heic.all({ buffer: data })
// }

// HEIC 解码
export async function HEICDecode(data: Buffer): Promise<DecodeResult> {
  log('HEIC 格式图片解码')
  sendEvent('decode', 'HEICDecode')
  const result = await heic({ buffer: data })
  return { ...result, data: Buffer.from(result.data) }
}
