const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const licenseEngine = require('./src/license-engine');

// Start the local server in-process without opening external browser
process.argv.push('--no-open');
require('./server.js');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1460,
    height: 920,
    minWidth: 1100,
    minHeight: 720,
    title: 'برنامج نماذج الموارد البشرية — دار تول للاستشارات',
    autoHideMenuBar: true,
    backgroundColor: '#162538',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const port = process.env.PORT || 4580;
  mainWindow.loadURL(`http://127.0.0.1:${port}`);
}

ipcMain.handle('license:status', () => {
  return licenseEngine.getCurrentMachineLicenseStatus();
});

ipcMain.handle('license:activate', (_event, { activationKey, clientName }) => {
  return licenseEngine.activateCurrentMachine(activationKey, clientName);
});

ipcMain.handle('document:exportPdf', async (_event, defaultFilename) => {
  if (!mainWindow) return { success: false };
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    title: 'حفظ المستند بصيغة PDF',
    defaultPath: defaultFilename || 'مستند-الموارد-البشرية.pdf',
    filters: [{ name: 'ملفات PDF', extensions: ['pdf'] }]
  });
  if (canceled || !filePath) return { success: false, canceled: true };

  const pdfData = await mainWindow.webContents.printToPDF({
    printBackground: true,
    pageSize: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 }
  });
  fs.writeFileSync(filePath, pdfData);
  return { success: true, filePath };
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
