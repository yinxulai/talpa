import fs from 'fs'
import path from 'path'

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development'
}

// 日志、方便调试
export function log(...args: any[]): void {
  if (isDev()) {
    console.log(...args)
  }
}

// 读取文件
export async function readFile(path: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 创建文件夹/文件, 支持多级
export async function mkdirs(pathstr: string): Promise<void> {
  log('创建文件夹/文件:', pathstr)
  return new Promise((resolve, reject) => {
    fs.exists(pathstr, function (exists) {
      if (exists) {
        resolve()
      } else {
        mkdirs(path.dirname(pathstr)).catch(reject)
          .then(() => {
            fs.mkdir(pathstr, (err) => {
              if (err) {
                console.log(err)
                reject(err)
              } else {
                resolve()
              }
            })
          })
      }
    })
  })
}

// 写出文件
export async function writeFile(data: Buffer, filename: string): Promise<void> {
  log('输出文件:', filename)
  await mkdirs(path.dirname(filename)) // 创建目录

  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, function (err) {
      if (err) {
        reject(reject)
      } else {
        resolve()
      }
    })
  })
}
