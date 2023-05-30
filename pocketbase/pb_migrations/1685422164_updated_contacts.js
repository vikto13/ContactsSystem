migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm")

  collection.createRule = "@request.auth.roles.id ?= \"qhr0l2rgvsyxz8r\""
  collection.updateRule = "@request.auth.roles.id ?= \"qhr0l2rgvsyxz8r\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xvchyeksew9z2sm")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
