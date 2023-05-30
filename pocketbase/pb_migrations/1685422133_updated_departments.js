migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5")

  collection.createRule = "@request.auth.roles.id ?= \"t4blvoxmwswvs3s\""
  collection.updateRule = "@request.auth.roles.id ?= \"t4blvoxmwswvs3s\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
