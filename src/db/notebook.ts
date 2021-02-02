interface Notebook {
  id: string;
  name: string;
}

let notebook: object = {
  findOne: async function (db: any, id: string): Promise<any> {
    await db.findOne({ id: id })
  },
  find: async function (db: any): Promise<any> {
  },
  remove: async function (db: any, id: string): Promise<any> {
    await db.remove({ id: id })
  },
  add: async function (db: any, note: Notebook): Promise<any> {
    await db.insert(note)
  },
  update: async function (db: any, note: Notebook): Promise<any> {
    await db.update({ id: note.id }, note)
  }
}


