// Imports
try { require('electron-reloader')(module) } catch(_){} // hot reloading

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const devMode = process.env.NODE_ENV !== 'production'

let availability;
let requirements;
let roles;

function setAvailability(data){
  console.log(data);
  availability = data
}
function setRequirements(data){
  console.log(data);
  requirements = data;
}
function setRoles(data){
  console.log(data);
  roles = data;
  
}
let setFieldFuncs = [setAvailability,setRequirements,setRoles];

function showData(index, data){

}

// Functions
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800 + (devMode ? 400 : 0),
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "index_preload.js")
    }
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


  ipcMain.on('setField', (e, index, file) => {
    console.log(file)
    data = fs.readFile(file, 'utf-8', (err, data) => {
      if(err) throw err;
      setFieldFuncs[index](data)
    })
  })

  ipcMain.on('getSched', (e) => {
    console.log("hook into the server and send the parameters\ninitiating the schedule making algo!")
  })
})

// Close
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
