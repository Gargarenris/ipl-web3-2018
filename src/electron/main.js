const {app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
const MAC_PLATFORM = "darwin"; // apparament mac = darwin 

const mainMenuTemplate = [ // a modifier avec le menu d'arthur
    {
        label : 'File',
        submenu:[
            {
                label : 'Quit',
                accelerator : process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    //app.quit();
                    mainWindow.webContents.send('ping', 'whooooh');
                }
            }
        ]
    }
]

function createWindow(){

    let tray = new Tray('icone.ico');
    mainWindow = new BrowserWindow();
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    tray.setContextMenu(mainMenu);
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