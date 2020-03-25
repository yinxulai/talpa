import jpegJs from 'jpeg-js'
import { log } from '../utils'

export function JPEGDecode(data) {
  log('JPEG 格式图片解码')
  const image = jpegJs.decode(data)
  return { ...image }
}
