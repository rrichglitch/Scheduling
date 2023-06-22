// Imports
const { app, BrowserWindow } = require('electron')

const devMode = process.env.NODE_ENV !== 'production'

// Functions
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800 + (devMode ? 400 : 0),
    height: 600
  })

  win.loadFile('index.html')

  if(devMode) win.webContents.openDevTools()
}

// Initialize
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Menu Template
// const menu = {
//   {

//   }
// }

// Close
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
