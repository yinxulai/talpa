import address from 'address'
import ua from 'universal-analytics'
import * as Sentry from '@sentry/electron'

let visitor: any = null

// 发送页面访问统计
export const sendView = (path = '/'): void => {
  visitor?.pageview(path).send()
}

// 发送事件统计信息
export const sendEvent = (category: string, action: string): void => {
  visitor?.event(category, action).send()
}

// 初始化
export const initGA = (): void => {
  address.mac((_, mac) => {
    visitor = ua('UA-99362118-4', mac || 'null-mac-address')
    sendView()
  })
}

// 初始化 sentry
export const initSentry = (): void => {
  Sentry.init({dsn: 'https://b9d49384ffcb4b6db599fa29ad3a6c94@sentry.io/5175941'})
}

// 发送异常
export const sendException = (error: any): void => {
  Sentry.captureException(error)
}
