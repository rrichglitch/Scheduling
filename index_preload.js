const {contextBridge, ipcRenderer} = require('electron')

function replaceText(selector, text){
    const element = document.getElementById(selector);
    if(element) element.innerHTML = text;
};

window.addEventListener("DOMContentLoaded", () => {
    for(const dependency of ["chrome", "node", "electron"]){
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
});

contextBridge.exposeInMainWorld('electronAPI', {
    setField: (index, file) => ipcRenderer.send('setField', index, file),
    getSched: () => ipcRenderer.send('getSched'),
    showAvail: (callback) => ipcRenderer.on('showAvail', callback),
    showReqs: (callback) => ipcRenderer.on('showReqs', callback),
    showRoles: (callback) => ipcRenderer.on('showRoles', callback),
});

