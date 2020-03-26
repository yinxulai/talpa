import * as utif from 'utif'
import { log } from '../utils'
import { DecodeResult } from './index'

export async function TIFFDecode(data: Buffer): Promise<DecodeResult> {
  log('TIFF 格式图片解码')
  const ifds: any[] = utif.decode(data)
  if (!ifds || !ifds.length) {
    throw new Error('TIFF 格式图片解码失败,文件内容可能为空')
  }
  return ifds.map(ifd => {
    utif.decodeImage(data, ifd)
    return { ...ifds[0] }
  })
}
