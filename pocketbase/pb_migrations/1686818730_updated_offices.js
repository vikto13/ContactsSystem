migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sgv7cbhlqq9svxa")

  collection.indexes = [
    "CREATE INDEX `_sgv7cbhlqq9svxa_created_idx` ON `offices` (`created`)",
    "CREATE UNIQUE INDEX `idx_unique_z07jaw8e` ON `offices` (`name`)"
  ]

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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z07jaw8e",
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
  const collection = dao.findCollectionByNameOrId("sgv7cbhlqq9svxa")

  collection.indexes = [
    "CREATE INDEX `_sgv7cbhlqq9svxa_created_idx` ON `offices` (`created`)",
    "CREATE UNIQUE INDEX \"idx_unique_z07jaw8e\" on \"offices\" (\"name\")"
  ]

  // remove
  collection.schema.removeField("hg59oyki")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z07jaw8e",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
