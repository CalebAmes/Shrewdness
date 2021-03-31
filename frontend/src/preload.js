
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('e_notification', {
  sendNotification(message){
    ipcRenderer.send('notify', message)
  }
})

window.sendNotification = (message) => {
  ipcRenderer.send('notify', message);
}

  