migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "li7j7pyb",
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
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "li7j7pyb",
    "name": "text",
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
