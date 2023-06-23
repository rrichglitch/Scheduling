// Imports
// Hot reloading
try {
  require('electron-reloader')(module)
} catch (_) {}

const { app, BrowserWindow } = require('electron')

const devMode = process.env.NODE_ENV !== 'production'

// Menu Template
// const menu = {
//   {

//   }
// }

// Functions
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800 + (devMode ? 400 : 0),
    height: 600
  })

  win.loadFile('index.html')
  win.setMenu(null)

  if(devMode) win.webContents.openDevTools()
}

// Initialize
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Close
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
