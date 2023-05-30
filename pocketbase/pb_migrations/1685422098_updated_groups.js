migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km")

  collection.createRule = "@request.auth.roles.id ?= \"t4blvoxmwswvs3s\""
  collection.updateRule = "@request.auth.roles.id ?= \"t4blvoxmwswvs3s\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
