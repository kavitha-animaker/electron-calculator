const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    notificationApi: {
        sendNotification(message) {
            console.log("hello", message)
            ipcRenderer.send('notify', message);
        }
    },
    batteryApi: {

    },
    filesApi: {

    }
})
