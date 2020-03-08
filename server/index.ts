import { app, BrowserWindow } from 'electron';
import './handler'

// 环境注入的入口变量
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    width: 400,
    height: 280,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true, 
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
    .then(() => mainWindow.show());

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
