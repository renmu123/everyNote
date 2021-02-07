import { v4 as uuidv4 } from "uuid";

interface Id {
  id: string;
}

interface NotebookAdd {
  name: string
  order: number
  children: object
}

interface NotebookUpdate extends Id, NotebookAdd {

}

let notebook: object = {
  findOne: async function (db: any, params: Id): Promise<any> {
    const id: string = params.id
    return await db.findOne({ id: id })
  },
  find: async function (db: any): Promise<any> {
    return await db.find()
  },
  remove: async function (db: any, params: Id): Promise<number> {
    const id: string = params.id
    return await db.remove({ id: id })
  },
  add: async function (db: any, params: NotebookAdd): Promise<any> {
    const name: string = params.name
    const order: number = params.order
    const data = {
      id: uuidv4(),
      name: name,
      order: order,
      type: "notebook"
    }
    const result = await db.insert(data)
    console.log("notebook", result)
    return result
  },
  update: async function (db: any, params: any): Promise<any> {
    const id: string = params.id
    const content: NotebookUpdate = {
      id: id,
      name: params.name,
      order: params.order,
      children: params.children
    }
    console.log(id, content)
    return await db.update({ id: id }, content)
  }
}

export default notebook