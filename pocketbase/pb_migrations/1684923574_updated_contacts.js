migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qcfcwa1h",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dl4ufy1p",
    "name": "divisions",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "odmtoiksd2m8aa5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0setti5h",
    "name": "departments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "e8z5x0sl1093mc5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h45yrg7h",
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
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qcfcwa1h",
    "name": "company",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dl4ufy1p",
    "name": "division",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "odmtoiksd2m8aa5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0setti5h",
    "name": "department",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "e8z5x0sl1093mc5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h45yrg7h",
    "name": "group",
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
})
