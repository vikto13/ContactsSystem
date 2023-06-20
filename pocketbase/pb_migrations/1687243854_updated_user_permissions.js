migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("adadquft6s38bg8")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("adadquft6s38bg8")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
