const { remote } = require('electron');
const { ipcRenderer, contextBridge } = require('electron');

let currWindow = remote.BrowserWindow.getFocusedWindow();

window.closeCurrentWindow = function(){
  currWindow.close();
}

contextBridge.exposeInMainWorld('e_notification', {
  sendNotification(message){
    ipcRenderer.send('notify', message)
  }
})

window.sendNotification = (message) => {
  ipcRenderer.send('notify', message);
}

  