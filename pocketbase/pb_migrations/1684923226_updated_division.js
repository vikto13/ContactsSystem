migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5")

  collection.name = "divisions"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("odmtoiksd2m8aa5")

  collection.name = "division"

  return dao.saveCollection(collection)
})
