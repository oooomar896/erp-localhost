const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('darToolDesktop', {
  isElectron: true,
  getLicenseStatus: () => ipcRenderer.invoke('license:status'),
  activateLicense: (activationKey, clientName) =>
    ipcRenderer.invoke('license:activate', { activationKey, clientName }),
  exportPdfNative: (defaultFilename) =>
    ipcRenderer.invoke('document:exportPdf', defaultFilename)
});
