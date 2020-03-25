import { PNG } from 'pngjs'
import { log } from'../utils'
import { ImageEncodeOptions } from './index'

export interface PNGEncodeOptions {
  //
}

// PNG 编码
export async function PNGEncode(image: ImageEncodeOptions, _: PNGEncodeOptions): Promise<Buffer> {
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
