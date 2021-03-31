const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

let mainWindow = null;

function main() {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL('http://localhost:5000/api/users')
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./public/index.html')
  isDev && win.webContents.openDevTools();
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

app.on('ready', main )

app.whenReady().then(createWindow);

ipcMain.on('notify', (_, message) => {
  new Notification({title: 'chatApp', body: message}).show();
})

ipcMain.on('app-quit', () => {
  app.quit();
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})