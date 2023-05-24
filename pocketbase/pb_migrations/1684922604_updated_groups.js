migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km")

  collection.name = "group"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pjdkoxvuryv0km")

  collection.name = "groups"

  return dao.saveCollection(collection)
})
