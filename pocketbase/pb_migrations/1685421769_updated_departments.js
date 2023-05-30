migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5")

  collection.deleteRule = "@request.auth.roles.id ?= \"h7snqos73oghj15\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
