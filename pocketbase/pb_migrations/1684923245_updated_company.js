migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a4q4sn2cjjsioqt")

  collection.name = "companies"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a4q4sn2cjjsioqt")

  collection.name = "company"

  return dao.saveCollection(collection)
})
