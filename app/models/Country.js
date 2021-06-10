import realm from '../db/schema'
import countries from '../data/json/countries'

const MODEL_NAME = 'Country'
const Country = (() => {
  return {
    all,
    find,
    where,
    create,
    update,
    deleteBatch,
    reloadBatch,
    createBatch,
    loadIfNotExists,
  }

  function find(code) {
    return realm.objectForPrimaryKey(MODEL_NAME, code)
  }

  function createBatch(collection) {
    collection.forEach(country => create(country))
  }

  function where(field, query) {
    return all().filtered(`${field} BEGINSWITH[c] "${query}"`)
  }

  function all() {
    return realm.objects(MODEL_NAME).sorted('id', false)
  }

  function create(country) {
    realm.write(() => {
      realm.create(MODEL_NAME, _buildData(country), 'modified');
    })
  }

  function update(id, params) {
    realm.write(() => {
      realm.create(MODEL_NAME, Object.assign(params, {id: id}), 'modified');
    });
  }

  function deleteBatch() {
    realm.write(() => {
      realm.delete(all())
    })
  }

  function reloadBatch(callback) {
    deleteBatch()
    createBatch(countries)
    callback();
  }

  function loadIfNotExists(callback) {
    if( !isExist() ) {
      createBatch(countries)
      callback()
    }
  }

  function isExist() {
    return all().length > 0
  }

  // private method

  function _buildData(item) {
    let params = {
      code: item.code,
      id: item.id,
      name: item.name,
      name_km: item.name_km,
      emoji_flag: item.emoji_flag,
    };

    return params;
  }
})()

export default Country
