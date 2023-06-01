migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3935l7q4o2ije15")

  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3935l7q4o2ije15")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
