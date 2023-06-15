migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sgv7cbhlqq9svxa")

  // remove
  collection.schema.removeField("hg59oyki")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sgv7cbhlqq9svxa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hg59oyki",
    "name": "company",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6pm3nos89zp7y7o",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
