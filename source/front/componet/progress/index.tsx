import React from 'react'
import styles from './style.less'

interface Props {
  total: number // 总计
  failure: number // 失败的
  completed: number // 完成的
}

export const Progress = (props: Props) => {

  const { total, failure, completed } = props
  const width = (value: number) => ({
    display: !value ? 'none' : '',
    width: (value && total) ? `${(value / total) * 100}%` : '0%'
  })

  return (
    <div className={styles.progress}>
      <div className={styles.content}>
        <div className={styles.title}>转换中</div>
        <div className={styles.subtitle}>正在转换请稍等...</div>
        <div className={styles.progressBar}>
          <span style={width(failure)} className={styles.failure}>{failure}</span>
          <span style={width(completed)} className={styles.completed}>{completed}</span>
          <span style={width(total)} className={styles.total}>{/*total*/}</span>
        </div>
      </div>
    </div>
  )
}

