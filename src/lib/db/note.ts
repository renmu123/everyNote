import { v4 as uuidv4 } from "uuid";

interface Note {
  name: string;
  content: string;
  editorId: string;
  isDelete: boolean;
  order: number;
  parentId: string;
}

interface Id {
  id: string;
}

interface NoteUpdate extends Note, Id {

}


let note: object = {
  find: async function (db: any): Promise<any> {
    const data = await db.find()
    return data
  },
  remove: async function (db: any, params: Id): Promise<number> {
    const id: string = params.id
    return await db.remove({ id: id })
  },
  add: async function (db: any, params: Note): Promise<any> {
    const data: NoteUpdate = {
      id: uuidv4(),
      name: params.name,
      order: params.order,
      parentId: params.parentId,
      content: params.content,
      isDelete: false,
      editorId: params.editorId
    }
    const result = await db.insert(data)
    console.log("notebook", result)
    return result
  },
  update: async function (db: any, params: NoteUpdate): Promise<any> {
    const id: string = params.id
    const data: NoteUpdate = {
      id: id,
      name: params.name,
      order: params.order,
      parentId: params.parentId,
      content: params.content,
      isDelete: params.isDelete,
      editorId: params.editorId
    }
    console.log("update", id, data)
    return await db.update({ id: id }, data)
  }
}

export default note
