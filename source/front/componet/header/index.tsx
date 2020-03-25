import React from 'react'
import styles from './style.less'

interface Props {
  title: string // 总计
}

export const Header = (_props: Props) => {
  // const { title } = props
  return (
    <div className={styles.header}>
      <div className={styles.left}></div>
      {/* 有标题不好看、不够简洁 */}
      {/* <div className={styles.center}>{title}</div> */}
      <div className={styles.right}></div>
    </div>
  )
}
