const { app, BrowserWindow, Menu } = require('electron');
const applicationMenu = require('./toolbar/menu');
const storeInfo = require('./storeInfo/app');

// ... Additional methods below ...

// main function uses all function of storeInfo
const StoreInfoToFile = async () => {
  try {
    const FileContent = await storeInfo.OsInfo();
    const Directory = storeInfo.os.homedir + storeInfo.env.parsed.FILE_PATH;
    const FilePath = Directory + storeInfo.env.parsed.FILE_NAME;

    console.log('\nCreate Directory : ');
    console.log(`${await storeInfo.CheckDirectory(Directory)}\n`);

    console.log('\nWrite File : ');
    console.log(`${await storeInfo.WriteFile(FileContent, FilePath)}\n`);

    console.log('\nRead File : ');
    console.log(`${await storeInfo.ReadFile(FilePath)}\n`);
  } catch (error) {
    console.log(`${error}\n`);
  }
};

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 725,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('app/index.html');
}

app.on('ready', () => {
  // check terminal for the output of this function that uses previous app
  StoreInfoToFile();

  Menu.setApplicationMenu(applicationMenu);
  createWindow();
});
// app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
