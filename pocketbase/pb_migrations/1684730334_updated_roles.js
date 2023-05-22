migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cvyp56ie6c39hvy")

  collection.name = "admin_roles"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cvyp56ie6c39hvy")

  collection.name = "roles"

  return dao.saveCollection(collection)
})
