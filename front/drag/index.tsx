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

export const Drag = (props: DragProps) => {
  const [dragState, updateDragState] = React.useState<DragState>(DragState.PRIMARY)
  const onDrag = e => { e.preventDefault(); updateDragState(DragState.DRAG) }
  const onDragEnd = e => { e.preventDefault(); updateDragState(DragState.DRAGEND) }
  const onDragOver = e => { e.preventDefault(); updateDragState(DragState.DRAGOVER) }
  const onDragLeave = e => { e.preventDefault(); updateDragState(DragState.DRAGLEAVE) }

  const onDrop: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    updateDragState(DragState.DROP)
    const { files } = e.dataTransfer
    const { onSelect = () => { } } = props
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
    <div className={styles.drag} onDrop {...eventListens}>
      <div className={styles.content}>
        <span className={styles.firstPrompt}>拖入需要转换的文件</span>
        <span className={styles.splitter}>OR</span>
        <span className={styles.secondaryPrompt}>点击选择文件</span>
        {dragState}
      </div>
    </div>
  )
}
