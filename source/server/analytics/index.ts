import address from 'address'
import ua from 'universal-analytics'

let visitor: any = null

// 发送页面信息
export const sendPageView = (path = '/') => {
  visitor?.pageview(path).send()
}
// 发送事件信息
export const sendEvent = (category: string, action: string) => {
  visitor?.event(category, action).send()
}
// 初始化
export const initGA = () => {
  address.mac((_, mac) => {
    visitor = ua('UA-99362118-4', mac || 'null-mac-address')
    sendPageView()
  })
}
