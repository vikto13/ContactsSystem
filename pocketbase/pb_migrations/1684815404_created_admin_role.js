migrate((db) => {
  const collection = new Collection({
    "id": "3935l7q4o2ije15",
    "created": "2023-05-23 04:16:44.491Z",
    "updated": "2023-05-23 04:16:44.491Z",
    "name": "admin_role",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "npuchzjc",
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
  const collection = dao.findCollectionByNameOrId("3935l7q4o2ije15");

  return dao.deleteCollection(collection);
})
