migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a4q4sn2cjjsioqt")

  collection.deleteRule = "@request.auth.roles.id ?= \"0k07cqao4w8ropc\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a4q4sn2cjjsioqt")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
