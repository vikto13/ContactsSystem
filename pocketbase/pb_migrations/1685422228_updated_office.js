migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  collection.createRule = "@request.auth.roles.id ?= \"prkf1eeg1iueu6o\""
  collection.updateRule = "@request.auth.roles.id ?= \"prkf1eeg1iueu6o\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu02gs5srhitbal")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
