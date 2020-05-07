const { app, BrowserWindow } = require('electron');

let appWindow;

function crearVentana(){
    //configuracion de la ventana que vamos a crear 
    //algunas config que no usamos por ahora resizable: false
    appWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        center: true,
        show: false,
        icon: 'icon.png'
    });

    //cuando la aplicacion es cerrada.
    appWindow.on('closed', () => {
        appWindow = null;
    });

    //Cargar HTLM
    appWindow.loadFile('./index.html');

    //cuando la aplicacion esta lista, mostrar la ventana
    appWindow.once('ready-to-show', () => {
        appWindow.show();
    });
}

app.on('ready', crearVentana);