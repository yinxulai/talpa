import { PNG } from 'pngjs'
import { log } from'../utils'
import { ImageEncodeOptions } from './index'

export interface PNGEncodeOptions {
  //
}

// PNG 编码
// TODO: 这个 lint 类型我咋配都报。。。
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function PNGEncode(image: ImageEncodeOptions, _options: PNGEncodeOptions): Promise<Buffer> {
  log('将数据按 PNG 格式进行编码')
  const { data, width, height } = image
  const png = new PNG({ width, height })

  png.data = data

  return PNG.sync.write(png, {
    deflateLevel: 9,
    deflateStrategy: 3,
    filterType: -1,
    colorType: 6,
    inputHasAlpha: true
  })
}
