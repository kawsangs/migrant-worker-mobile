import realm from '../db/schema'
import countries from '../data/json/countries'

const MODEL_NAME = 'Country'
const Country = (() => {
  return {
    all,
    find,
    where,
    create,
    deleteBatch,
    createBatch,
    reloadBatch,
  }

  function find(id) {
    return realm.objectForPrimaryKey(MODEL_NAME, id)
  }

  function createBatch() {
    countries.forEach(country => create(country))
  }

  function where(field, query) {
    return all().filtered(`${field} BEGINSWITH[c] "${query}"`)
  }

  function all() {
    return realm.objects(MODEL_NAME)
  }

  function create(country) {
    realm.write(() => {
      realm.create(MODEL_NAME, country);
    })
  }

  function deleteBatch() {
    realm.write(() => {
      realm.delete(all())
    })
  }

  function reloadBatch(callback) {
    deleteBatch()
    createBatch()
    callback()
  }
})()

export default Country
