const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
    const win = new BrowserWindow({
        width: 300,
      height: 450,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavascript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadURL(
        isDev
        ? 'http://localhost:3000'
        :`file://${path.join(__dirname,'./index.html')}`
    )
}

ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'NOTIFICATION_TITLE', body: message }).show()
})

app.whenReady().then(createWindow)