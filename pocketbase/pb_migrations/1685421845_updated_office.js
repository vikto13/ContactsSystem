migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  collection.deleteRule = "@request.auth.roles.id ?= \"iv5cp9hmfgada7h\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
