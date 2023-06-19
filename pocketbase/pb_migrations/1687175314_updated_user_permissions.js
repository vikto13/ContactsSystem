migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("adadquft6s38bg8")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.permissions_id = @request.data.id "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("adadquft6s38bg8")

  collection.listRule = null

  return dao.saveCollection(collection)
})
