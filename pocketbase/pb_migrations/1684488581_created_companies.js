migrate((db) => {
  const collection = new Collection({
    "id": "a4q4sn2cjjsioqt",
    "created": "2023-05-19 09:29:41.387Z",
    "updated": "2023-05-19 09:29:41.387Z",
    "name": "companies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vvnkdqzr",
        "name": "name",
        "type": "text",
        "required": true,
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
  const collection = dao.findCollectionByNameOrId("a4q4sn2cjjsioqt");

  return dao.deleteCollection(collection);
})
