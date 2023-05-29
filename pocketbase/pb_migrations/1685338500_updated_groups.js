migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rfehzc92",
    "name": "groups",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "7pjdkoxvuryv0km",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km")

  // remove
  collection.schema.removeField("rfehzc92")

  return dao.saveCollection(collection)
})
