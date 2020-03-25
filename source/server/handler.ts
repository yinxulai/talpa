import convert from './convert'
import { ipcMain } from 'electron'
import { ConvertOptions } from '../../typings/convert'

// 监听通信
ipcMain.handle('convert', (_, options: ConvertOptions) => {
  return convert(options)
})

