migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  collection.name = "offices"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  collection.name = "office"

  return dao.saveCollection(collection)
})
