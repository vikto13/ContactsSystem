migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sgv7cbhlqq9svxa")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sgv7cbhlqq9svxa")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
