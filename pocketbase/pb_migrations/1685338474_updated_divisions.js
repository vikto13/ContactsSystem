migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uyqgqb6l",
    "name": "companies",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "a4q4sn2cjjsioqt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5")

  // remove
  collection.schema.removeField("uyqgqb6l")

  return dao.saveCollection(collection)
})
