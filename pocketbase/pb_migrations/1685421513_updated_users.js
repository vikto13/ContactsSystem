migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lrrdxfze",
    "name": "roles",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3935l7q4o2ije15",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lrrdxfze",
    "name": "roles",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3935l7q4o2ije15",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
