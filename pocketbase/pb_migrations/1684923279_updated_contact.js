migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm")

  collection.name = "contacts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm")

  collection.name = "contact"

  return dao.saveCollection(collection)
})
