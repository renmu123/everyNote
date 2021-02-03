import { ipcRenderer } from "electron";

async function addNotebook(): Promise<{ id: string; name: string }> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "notebook",
    method: "add",
    params: {
      name: "新建笔记本",
    },
  });
  return result;
}

async function findNotebook(): Promise<{ id: string; name: string }> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "notebook",
    method: "find",
    params: {}
  });
  return result;
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
export { addNotebook, findNotebook, removeNotebook }