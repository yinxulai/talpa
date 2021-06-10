import React from 'react'
import styles from './style.less'
import { SupportedEncodeMimeType as SupType } from '../../../../typings/format'

interface Props {
  value: SupType
  onSelect: (type: SupType) => void
}

export const Exports = (props: Props) => {
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
    </div>
  )
}

