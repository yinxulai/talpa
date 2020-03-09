import { ipcMain } from 'electron';
import convert, { ConvertOptions } from './convert';

// 监听通信
ipcMain.handle('convert', (_, options: ConvertOptions) => {
  return convert(options)
})