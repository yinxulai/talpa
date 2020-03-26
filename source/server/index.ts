import { app, BrowserWindow } from 'electron'
import { format as formatUrl } from 'url'
import { initGA } from './analytics'
import { isDev } from './utils'
import path from 'path'
import './handler'

initGA()

// 启动热更新
if (module.hot) { module.hot.accept() }

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null

function createMainWindow() {
  const options = {
    resizable: isDev()
  }

  const window = new BrowserWindow({
    width: 350,
    height: 250,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
    ...options
  })

  window.on('ready-to-show', () => {
    window.show()
  })

  if (isDev()) {
    window.webContents.openDevTools()
  }

  if (isDev()) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  window.on('closed', () => {
    mainWindow = null
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
