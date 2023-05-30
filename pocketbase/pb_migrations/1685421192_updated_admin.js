migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdfjm9pqe4y7xh4")

  collection.deleteRule = "@request.auth.roles.id ?= \"hkspt62dzuwvnod\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xdfjm9pqe4y7xh4")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
