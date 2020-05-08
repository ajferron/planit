const electron = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let win

function createWindow() {
    win = new BrowserWindow({
        width: 960,
        height: 600,
        resizable: true,
        frame: false,
        titleBarStyle: 'hidden',
        trafficLightPosition: {x: 20, y: 40}
    })

    win.loadURL(isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`,
    )

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})