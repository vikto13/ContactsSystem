migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  // remove
  collection.schema.removeField("ltgddbch")

  // add
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
}, (db) => {
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

  // remove
  collection.schema.removeField("jhjfgnuw")

  return dao.saveCollection(collection)
})
