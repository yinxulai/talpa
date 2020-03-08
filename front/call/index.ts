import { ipcRenderer } from 'electron'

type ImageFormat = 'PNG' | 'JPEG'

// 单个文件转换
export async function convertFile(filepath: string, format: ImageFormat) {
  return ipcRenderer.invoke('convertfile', filepath, format)
}

