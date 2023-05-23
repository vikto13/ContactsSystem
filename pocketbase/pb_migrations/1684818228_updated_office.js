migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  // remove
  collection.schema.removeField("vsv3i8yv")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vsv3i8yv",
    "name": "name",
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
})
