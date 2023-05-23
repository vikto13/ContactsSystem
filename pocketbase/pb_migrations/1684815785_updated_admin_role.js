migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3935l7q4o2ije15")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npuchzjc",
    "name": "title",
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
  const collection = dao.findCollectionByNameOrId("3935l7q4o2ije15")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npuchzjc",
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
