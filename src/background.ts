import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import DataStore from "nedb-promises";
import notebook from "./lib/db/notebook";

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
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  for (const dbName of ["note", "notebook", "tag"]) {
    const db: DataStore = dbFactory(`${dbName}.db`);
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
ipcMain.handle("db-exec", async (event, args) => {

  const dbName: string = args.dbName
  const menthod: string = args.method
  const params: object = args.params
  const db: any = dbObecjt[dbName]
  let result: any = ""
  if (dbName === "notebook") {
    console.log("db", notebook[menthod])
    result = await notebook[menthod](db, params)
    console.log('db-name', dbName)
    console.log("db-params", params)
    console.log("db-result", result)
  }
  return result
});
