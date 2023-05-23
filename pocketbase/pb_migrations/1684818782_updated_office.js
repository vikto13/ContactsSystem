migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ltgddbch",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  // remove
  collection.schema.removeField("ltgddbch")

  return dao.saveCollection(collection)
})
