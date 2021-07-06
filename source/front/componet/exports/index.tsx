import React from 'react'
import styles from './style.less'
import { SupportedEncodeMimeType as SupType } from '../../../../typings/format'

interface Props {
  value: SupType
  onSelect: (_type: SupType) => void
}

export const Exports = (props: Props): React.ReactElement => {
  const { value, onSelect } = props
  const classNames = (supType: SupType) => {
    return value !== supType
      ? { className: styles.selectItem }
      : { className: [styles.selectItem, styles.selected].join(' ') }
  }

  return (
    <div className={styles.exports}>
      {
        Object.keys(SupType).map(mimeType => {
          const typeValue = SupType[mimeType]

          return (
            <div key={typeValue} {...classNames(typeValue)} onClick={() => onSelect(typeValue)}>
              <div className={styles.extName}>{typeValue.split('/')[1].toUpperCase()}</div>
              {/* <div className={styles.mimeType}>{typeValue}</div> */}
            </div>
          )
        })
      }

      {/* // 如果格式增加，非常见格式放在浮层让用户选择 */}
      <div className={styles.selectItem}>
        {/* 点击弹起浮层 */}
        <div className={styles.extName}>更多</div>
      </div>
    </div>
  )
}
