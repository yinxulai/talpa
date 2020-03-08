import React from 'react'
import ReactDOM from 'react-dom'

import { Drag } from './drag'
import styles from './index.less'

const App = () => {
  return (
    <div className={styles.app}>
      <Drag onSelect={console.log}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
