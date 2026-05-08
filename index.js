const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;
const remote = require ('@electron/remote/main');
remote.initialize();
// const app = electron.app;

app.on('ready', ()=>{
    console.log("App is ready");
    const mainWindow = new BrowserWindow({
        height:800,
        width:600,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    remote.enable(mainWindow.webContents);
    mainWindow.loadURL(`file://${__dirname}/index.html`)
});
ipcMain.on("video:submit", (event, filePath)=>{
    console.log("Processing video information for file: ", filePath);
    ffmpeg.ffprobe(filePath, (err, metadata)=>{
        if(err)
        {
            console.log("FFprobe error: ", err);
            event.reply("video:error", err);
            return;
        }
        if(!metadata || !metadata.format){
            console.log("Metadata Error: ", metadata);
            event.reply("video:error", 'Invalid metadata');
            return;
        }
        const duration = metadata.format.duration;
        console.log("Duration: ", duration);
        event.reply('video:durationAnalyzed', duration);
    });
});
//npm install electron
//npm install @electron/remote
//npm install fluent-ffmpeg