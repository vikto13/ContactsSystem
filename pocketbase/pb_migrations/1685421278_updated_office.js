migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  collection.deleteRule = "@request.auth.roles.id ?= \"0k07cqao4w8ropc\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
