migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km")

  collection.deleteRule = "@request.auth.roles.id ?= \"h7snqos73oghj15\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
