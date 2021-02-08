import { ipcRenderer } from "electron";

async function addNote(params: any): Promise<{ id: string; name: string }> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "note",
    method: "add",
    params: params
  });
  return result;
}

async function findNote(): Promise<{ id: string; name: string }> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "note",
    method: "find",
    params: {}
  });
  return result.sort((a: any, b: any) => a.order - b.order);
}

async function removeNote(id: string): Promise<any> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "note",
    method: "remove",
    params: {
      id: id
    }
  });
  return result;
}

async function updateNote(params: any): Promise<any> {
  const result = await ipcRenderer.invoke("db-exec", {
    dbName: "note",
    method: "update",
    params: params
  });
  return result;
}

export { addNote, findNote, removeNote, updateNote }
