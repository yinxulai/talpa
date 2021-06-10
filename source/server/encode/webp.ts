import webp from 'webp-converter'
import { log } from'../utils'
import { sendEvent } from '../../anys'
import { ImageEncodeOptions } from './index'
webp.grant_permission()

export interface WEBPEncodeOptions {
//   quality?: number
}

// WEBP 编码
export async function WEBPEncode(image: ImageEncodeOptions, options: WEBPEncodeOptions): Promise<Buffer> {
  log('将数据按 WEBP 格式进行编码')
  sendEvent('encode', 'WEBPEncode')
  let webpBuffer: any;
  await webp.buffer2webpbuffer(image).then(function(result) {
    // you access the value from the promise here
    webpBuffer = result.data
  })
  return webpBuffer.data
}
