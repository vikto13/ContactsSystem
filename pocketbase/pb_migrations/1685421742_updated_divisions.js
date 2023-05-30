migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5")

  collection.deleteRule = "@request.auth.roles.id ?= \"h7snqos73oghj15\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
