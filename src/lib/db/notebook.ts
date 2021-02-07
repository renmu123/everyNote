import { v4 as uuidv4 } from "uuid";

interface Id {
  id: string;
}

interface NotebookAdd {
  name: string
  order: number
  parentId: string
}

interface NotebookUpdate extends Id, NotebookAdd {

}
function transformTree(list: NotebookUpdate[]) {
  const keyField = 'id'
  const childField = 'children'
  const parentField = 'parentId'


  const tree: any = []
  const record: any = {}

  for (let i = 0, len = list.length; i < len; i++) {
    const item: any = list[i]
    const id: any = item[keyField]

    if (!id) {
      continue
    }

    if (record[id]) {
      item[childField] = record[id]
    } else {
      item[childField] = record[id] = []
    }

    if (item[parentField]) {
      const parentId = item[parentField]

      if (!record[parentId]) {
        record[parentId] = []
      }

      record[parentId].push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}
let notebook: object = {
  findOne: async function (db: any, params: Id): Promise<any> {
    const id: string = params.id
    return await db.findOne({ id: id })
  },
  find: async function (db: any): Promise<any> {
    const data = await db.find()
    const treeData = transformTree(data)
    console.log("tree", treeData)
    return treeData
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
      parentId: params.parentId
    }
    const result = await db.insert(data)
    console.log("notebook", result)
    return result
  },
  update: async function (db: any, params: NotebookUpdate): Promise<any> {
    const id: string = params.id
    const content: NotebookUpdate = {
      id: id,
      name: params.name,
      order: params.order,
      parentId: params.parentId
    }
    console.log("update", id, content)
    return await db.update({ id: id }, content)
  }
}

export default notebook