import React from 'react'
import { convert } from './call'
import ReactDOM from 'react-dom'
import { Format } from '../typings/format'

import { Drag } from './componet/drag'
import styles from './index.less'

async function handleFile(files: File[]) {
  for (let index = 0; index < files.length; index++) {
    await convert({
      outFormat: Format.JPEG,
      srcPath: files[index].path
    })
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
