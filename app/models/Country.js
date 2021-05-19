import realm from '../db/schema'
import countries from '../data/json/countries'

const Country = (() => {
  return {
    all,
    where,
    create,
    deleteBatch,
    createBatch,
    reloadBatch,
  }

  function createBatch() {
    countries.forEach(country => create(country))
  }

  function where(field, query) {
    return all().filtered(`${field} BEGINSWITH[c] "${query}"`)
  }

  function all() {
    return realm.objects('Country')
  }

  function create(country) {
    realm.write(() => {
      const attr = (({id, flag, name}) => ({id, name}))(country)
      realm.create('Country', attr);
    })
  }

  function deleteBatch() {
    realm.write(() => {
      realm.delete(all())
    })
  }

  function reloadBatch() {
    deleteBatch()
    createBatch()
  }
})()

export default Country
