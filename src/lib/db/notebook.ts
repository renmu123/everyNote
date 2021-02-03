import { v4 as uuidv4 } from "uuid";

interface Id {
  id: string;
}

interface NotebookAdd {
  name: string
}

interface NotebookUpdate extends Id, NotebookAdd {

}



let notebook: object = {
  findOne: async function (db: any, params: Id): Promise<any> {
    const id: string = params.id
    return await db.findOne({ id: id })
  },
  find: async function (db: any): Promise<any> {
    console.log("find", db.find())
    return await db.find()
  },
  remove: async function (db: any, params: Id): Promise<number> {
    const id: string = params.id
    return await db.remove({ id: id })
  },
  add: async function (db: any, params: NotebookAdd): Promise<any> {
    const name: string = params.name
    const data = {
      id: uuidv4(),
      name: name,
      type: "notebook"
    }
    const result = await db.insert(data)
    console.log("notebook", result)
    return result
  },
  update: async function (db: any, params: NotebookUpdate): Promise<any> {
    const id: string = params.id
    const content: string = params.name
    await db.update({ id: id }, content)
  }
}

export default notebook