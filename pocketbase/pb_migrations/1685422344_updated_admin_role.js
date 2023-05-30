migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3935l7q4o2ije15")

  collection.updateRule = "@request.auth.roles.id ?= \"b1v4ob00ni2ncgc\""
  collection.deleteRule = "@request.auth.roles.id ?= \"b1v4ob00ni2ncgc\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3935l7q4o2ije15")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
