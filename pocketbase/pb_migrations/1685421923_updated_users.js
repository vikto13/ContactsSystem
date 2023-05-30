migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.deleteRule = "@request.auth.roles.id ?= \"hkspt62dzuwvnod\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
