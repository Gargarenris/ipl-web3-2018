const {app, BrowserWindow, Tray, Menu, shell, nativeImage } = require('electron');
const path = require('path');

//process.env.NODE_ENV='production'; //permet de modifier le menu 

let mainWindow;
const MAC_PLATFORM = "darwin"; // apparament mac = darwin 

const mainMenuTemplate = [
    {
        label : 'Options',
        submenu:[
            {
                label : 'Theme',
                accelerator : process.platform == 'darwin' ? 'Command+T' : 'Ctrl+T',
                click(){
                    mainWindow.webContents.send('ping', 'whooooh');
                }
            },
            {
                type:'separator'
            },
            {
                label:'Quitter',
                accelerator : process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push(
        {
            label:'Dev Tools',
            accelerator : process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            click(){
                if(BrowserWindow.getFocusedWindow()==null) return;
                BrowserWindow.getFocusedWindow().toggleDevTools();
            }
        },
        {
            label:'Help',
            submenu: [{
                label:'Documentation electron',
                accelerator : process.platform == 'darwin' ? 'Command+H' : 'Ctrl+H',
                click(){
                    shell.openExternal('https://electronjs.org/docs');
                }
            }]
        }
    )
}

app.setUserTasks([
    {
      program: process.execPath,
      arguments: '',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'Nouvelle fenêtre',
      description: 'Créer une nouvelle fenêtre'
    }
  ])

function createWindow(){

    const image = nativeImage.createFromPath('./src/electron/icone.ico');
    let tray = new Tray(image);

    mainWindow = new BrowserWindow();
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
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