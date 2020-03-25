// 上报 error
export function reportError(err: any) {

}

// reportError 的工具方法
export function runInErrorReport<R>(func: () => R) {
  try { return func() }
  catch (err) { return reportError(err) }
}