const { app, BrowserWindow } = require('electron');

const SSEWin = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadFile('../../src/index.html');
};

app.whenReady().then(() => {
    SSEWin();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) SSEWin();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});