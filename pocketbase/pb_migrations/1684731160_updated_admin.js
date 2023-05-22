migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9sdlia3s8na94xd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kphzaawe",
    "name": "roles",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "cvyp56ie6c39hvy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9sdlia3s8na94xd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kphzaawe",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "cvyp56ie6c39hvy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
