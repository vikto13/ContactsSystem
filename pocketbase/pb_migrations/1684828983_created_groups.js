migrate((db) => {
  const collection = new Collection({
    "id": "7pjdkoxvuryv0km",
    "created": "2023-05-23 08:03:03.821Z",
    "updated": "2023-05-23 08:03:03.821Z",
    "name": "groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "a3yqm245",
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
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km");

  return dao.deleteCollection(collection);
})
