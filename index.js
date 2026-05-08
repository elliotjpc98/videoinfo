const electron = require('electron');
const { app, BrowserWindow } = electron;
// const app = electron.app;

app.on('ready', ()=>{
    console.log("App is ready");
    const mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`)
});