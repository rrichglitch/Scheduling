// Imports
const { app, BrowserWindow } = require('electron')

// Functions
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
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
