import React from 'react'
import styles from './style.less'

enum DragState {
  PRIMARY = 'PRIMARY', // 原始状态

  DRAG = 'DRAG', // 拖拽期间在被拖拽元素上连续触发
  DROP = 'DROP', // 鼠标在拖放目标上释放时,在拖放目标上触发.此时监听器需要收集数据并且执行所需操作
  DRAGEND = 'DRAGEND', // 鼠标在拖放目标上释放时,在拖拽元素上触发.将元素从浏览器拖放到操作系统时不会触发此事件.
  DRAGOVER = 'DRAGOVER', // 拖拽时鼠标在目标元素上移动时触发.监听器通过阻止浏览器默认行为设置元素为可拖放元素.
  DRAGLEAVE = 'DRAGLEAVE', //拖拽时鼠标移出目标元素时在目标元素上触发.此时监听器可以取消掉前面设置的视觉效果
}

interface DragProps {
  onSelect: (file: File[]) => void
}

export const Drag = (props: DragProps): React.ReactElement => {
  const [dragState, updateDragState] = React.useState<DragState>(DragState.PRIMARY)
  const onDrag = e => { e.preventDefault(); updateDragState(DragState.DRAG) }
  const onDragEnd = e => { e.preventDefault(); updateDragState(DragState.DRAGEND) }
  const onDragOver = e => { e.preventDefault(); updateDragState(DragState.DRAGOVER) }
  const onDragLeave = e => { e.preventDefault(); updateDragState(DragState.DRAGLEAVE) }

  const isState = (...states: DragState[]) => states.includes(dragState)

  const onDrop: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    updateDragState(DragState.DROP)
    const { files } = e.dataTransfer
    const { onSelect = () => null } = props
    onSelect(Array(files.length).fill(null).map((_, index) => files[index]))
  }

  const eventListens = {
    onDrag,
    onDrop,
    onDragEnd,
    onDragOver,
    onDragLeave
  }

  return (
    <div
      {...eventListens}
      className={[styles.drag, styles[dragState]].join(' ')}
    >
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg viewBox="0 0 82 64" version="1.1" >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="iOS-App-Icon-Template" transform="translate(-1564.000000, -977.000000)" fill="#FFFFFF">
                <g id="image" transform="translate(1605.000000, 1009.000000) scale(-1, 1) translate(-1605.000000, -1009.000000) translate(1560.000000, 977.000000)">
                  <circle id="yue" cx="72.5" cy="11.5" r="11.5"></circle>
                  <path d="M5.22014125,57.4962175 L27.3805368,29.8865443 C28.7633377,28.1637104 31.2809522,27.8880592 33.0037861,29.2708601 C33.2308049,29.4530725 33.4372548,29.6595222 33.6194676,29.8865408 L50.2671998,50.6279301 C51.6500027,52.3507625 54.1676175,52.6264109 55.8904499,51.2436081 C56.1282796,51.052718 56.3434991,50.8352559 56.5319136,50.5954602 L64.8547194,40.003006 C66.2195896,38.2659325 68.7342118,37.9642021 70.4712853,39.3290723 C70.7219959,39.5260631 70.9482542,39.7523235 71.1452425,40.003036 L84.915418,57.5287138 C86.2802717,59.2658003 85.9785173,61.7804197 84.2414308,63.1452734 C83.5366886,63.6989994 82.6664003,64 81.7701446,64 L8.33960803,64 C6.13046903,64 4.33960803,62.209139 4.33960803,60 C4.33960803,59.0895151 4.65022723,58.2062743 5.22014125,57.4962175 Z" id="san"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        {
          isState(DragState.DRAGOVER) &&
          (<span className={styles.firstPrompt}>松开</span>)
        }
        {
          isState(DragState.DROP, DragState.PRIMARY, DragState.DRAGLEAVE) &&
          (<span className={styles.firstPrompt}>拖入 & 松开</span>)
        }
        <span className={styles.secondaryPrompt}>支持常见格式，尽管全部拖进来!</span>
        <span className={styles.secondaryPrompt}>更多格式正在支持中...</span>
        {/* {dragState} */}
      </div>
    </div>
  )
}
