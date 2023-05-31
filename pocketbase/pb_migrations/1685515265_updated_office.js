migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jhjfgnuw",
    "name": "companies",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "a4q4sn2cjjsioqt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jhjfgnuw",
    "name": "name",
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
})
