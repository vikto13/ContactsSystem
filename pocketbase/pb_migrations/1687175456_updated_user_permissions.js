migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("adadquft6s38bg8")

  collection.viewRule = "@request.auth.id != \"\" "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("adadquft6s38bg8")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
