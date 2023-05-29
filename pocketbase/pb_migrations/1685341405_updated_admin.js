migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdfjm9pqe4y7xh4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cw5jcvmf",
    "name": "phone_number",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdfjm9pqe4y7xh4")

  // remove
  collection.schema.removeField("cw5jcvmf")

  return dao.saveCollection(collection)
})
