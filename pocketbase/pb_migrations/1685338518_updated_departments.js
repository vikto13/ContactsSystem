migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xpxjdrg8",
    "name": "departments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "e8z5x0sl1093mc5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5")

  // remove
  collection.schema.removeField("xpxjdrg8")

  return dao.saveCollection(collection)
})
