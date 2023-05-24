migrate((db) => {
  const collection = new Collection({
    "id": "xvchyeksew9z2sm",
    "created": "2023-05-24 04:22:23.741Z",
    "updated": "2023-05-24 04:22:23.741Z",
    "name": "contacts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ic72aw5v",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "4uabuomi",
        "name": "surname",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wfn5o3qk",
        "name": "position",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ccjkkxmf",
        "name": "email",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "rbivhwmq",
        "name": "phone_number",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "hukgyj9t",
        "name": "image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm");

  return dao.deleteCollection(collection);
})
