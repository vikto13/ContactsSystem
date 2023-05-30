migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm")

  collection.deleteRule = "@request.auth.roles.id ?= \"1u8lqzompxeb2u0\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
