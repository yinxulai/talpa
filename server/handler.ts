import { ipcMain } from 'electron';

// 监听通信
ipcMain.handle('convertfile', (event, filepath: string, format: string) => {
  console.log(event, filepath, format)
  return `${filepath}: 处理完成`
})