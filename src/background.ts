import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import DataStore from "nedb-promises";

const isDevelopment = process.env.NODE_ENV !== "production";

const dbFactory = (fileName: string) =>
  DataStore.create({
    filename: `${app.getAppPath()}/data/db/${fileName}`,
    timestampData: true,
    autoload: true
  });

let dbObecjt: object = {}

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
      require('devtron').install()
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  for (const dbName of ["note", "notebook", "tag"]) {
    const db = dbFactory(`${dbName}.db`);
    dbObecjt[dbName] = db
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// {token: token, method: 'insert, findOne', dbname: 'notes', params: {username: "life"}};
ipcMain.on("db-exec", (event, args) => {

  const db: any = dbObecjt[args.dbName]
  console.log("adasd", db)
  event.returnValue = args.dbName
  // event.reply('asynchronous-reply', 'pong')
  // event.returnValue = 'pong'
});
