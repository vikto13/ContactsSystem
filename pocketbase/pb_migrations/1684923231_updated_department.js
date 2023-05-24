migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5")

  collection.name = "departments"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e8z5x0sl1093mc5")

  collection.name = "department"

  return dao.saveCollection(collection)
})
