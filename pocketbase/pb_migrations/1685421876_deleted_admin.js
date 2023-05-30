migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xdfjm9pqe4y7xh4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "xdfjm9pqe4y7xh4",
    "created": "2023-05-23 04:19:24.152Z",
    "updated": "2023-05-30 04:33:12.131Z",
    "name": "admin",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "h9zb8vat",
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
        "id": "7kyrnpz8",
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
        "id": "2ziiiiri",
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
      },
      {
        "system": false,
        "id": "mac1zfi5",
        "name": "avatar",
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
      },
      {
        "system": false,
        "id": "cw5jcvmf",
        "name": "phone_number",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "@request.auth.roles.id ?= \"hkspt62dzuwvnod\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})