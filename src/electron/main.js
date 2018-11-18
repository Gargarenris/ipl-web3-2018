const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;
const MAC_PLATFORM = "darwin"; // apparament mac = darwin 

function createWindow(){
    mainWindow = new BrowserWindow();
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function(){
    if(process.platform !== MAC_PLATFORM){
        app.quit();
    }
});

app.on('activate', function(){
    if(mainWindow === null){
        createWindow();
    }
});