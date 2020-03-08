import React from 'react'
import ReactDOM from 'react-dom'
import { convertFile } from './call'

import { Drag } from './drag'
import styles from './index.less'

async function handleFile(files: File[]) {
  for (let index = 0; index < files.length; index++) {
    console.log(files[index].path)
    const result = await convertFile(files[index].path, 'PNG')
    console.log(result)
  }
}

const App = () => {
  return (
    <div className={styles.app}>
      <Drag onSelect={handleFile} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
