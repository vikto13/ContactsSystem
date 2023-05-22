migrate((db) => {
  const collection = new Collection({
    "id": "cvyp56ie6c39hvy",
    "created": "2023-05-22 04:25:11.259Z",
    "updated": "2023-05-22 04:25:11.259Z",
    "name": "roles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7yvbqozd",
        "name": "title",
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
  const collection = dao.findCollectionByNameOrId("cvyp56ie6c39hvy");

  return dao.deleteCollection(collection);
})
