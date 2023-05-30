migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a4q4sn2cjjsioqt")

  collection.createRule = "@request.auth.roles.id ?= \"4mnm5qlh51ho723\""
  collection.updateRule = "@request.auth.roles.id ?= \"4mnm5qlh51ho723\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a4q4sn2cjjsioqt")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
