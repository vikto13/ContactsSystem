migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sgv7cbhlqq9svxa")

  collection.listRule = null
  collection.viewRule = null
  collection.indexes = [
    "CREATE INDEX `_sgv7cbhlqq9svxa_created_idx` ON `offices` (`created`)",
    "CREATE UNIQUE INDEX `idx_unique_z07jaw8e` ON `offices` (`name`)"
  ]

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

  collection.listRule = ""
  collection.viewRule = ""
  collection.indexes = [
    "CREATE INDEX `_sgv7cbhlqq9svxa_created_idx` ON `offices` (`created`)",
    "CREATE UNIQUE INDEX \"idx_unique_z07jaw8e\" on \"offices\" (\"name\")"
  ]

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
