migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.username = \"\""
  collection.viewRule = "@request.auth.id != \"\" && @request.auth.username = \"\""
  collection.createRule = "@request.auth.id != \"\" && @request.auth.username = \"\""
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.username = \"\""
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.username = \"\""
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": false,
    "allowUsernameAuth": false,
    "exceptEmailDomains": null,
    "manageRule": "@request.auth.id != \"\" && @request.auth.username = \"\"",
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "requireEmail": false
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": false,
    "allowUsernameAuth": false,
    "exceptEmailDomains": null,
    "manageRule": "@request.auth.id != \"\" && @request.auth.username = \"admin\"",
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "requireEmail": false
  }

  return dao.saveCollection(collection)
})
