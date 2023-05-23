migrate((db) => {
  const collection = new Collection({
    "id": "odmtoiksd2m8aa5",
    "created": "2023-05-23 08:02:51.255Z",
    "updated": "2023-05-23 08:02:51.255Z",
    "name": "divisions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "li7j7pyb",
        "name": "text",
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
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5");

  return dao.deleteCollection(collection);
})
