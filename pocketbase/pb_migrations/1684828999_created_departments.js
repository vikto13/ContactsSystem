migrate((db) => {
  const collection = new Collection({
    "id": "e8z5x0sl1093mc5",
    "created": "2023-05-23 08:03:19.572Z",
    "updated": "2023-05-23 08:03:19.572Z",
    "name": "departments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5iygvhpv",
        "name": "name",
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
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5");

  return dao.deleteCollection(collection);
})
