import { ipcRenderer } from "electron";

async function addNotebook(params: any): Promise<{ id: string; name: string }> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "notebook",
    method: "add",
    params: params
  });
  return result;
}

async function findNotebook(): Promise<{ id: string; name: string }> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "notebook",
    method: "find",
    params: {}
  });
  return result.sort((a: any, b: any) => a.order - b.order);
}

async function removeNotebook(id: string): Promise<any> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "notebook",
    method: "remove",
    params: {
      id: id
    }
  });
  return result;
}

async function updateNotebook(params: any): Promise<any> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "notebook",
    method: "update",
    params: params
  });
  return result;
}

export { addNotebook, findNotebook, removeNotebook, updateNotebook }