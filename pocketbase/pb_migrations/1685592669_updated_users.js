migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = "@request.auth.roles.id ?= \"b1v4ob00ni2ncgc\""
  collection.updateRule = "@request.auth.roles.id ?= \"b1v4ob00ni2ncgc\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
