import realm from '../db/schema'
import Country from './Country'
// import institutions from '../data/json/institutions'
import Contact from './Contact'
import _ from 'underscore'

const MODEL_NAME = 'Institution'
const Institution = (() => {
  return {
    all,
    find,
    where,
    create,
    update,
    deleteBatch,
    createBatch,
    reloadBatch,
  }

  function createBatch(institutions) {
    return _.map( institutions, serializer => create(serializer))
  }

  function where(field, query) {
    return all().filtered(`${field} BEGINSWITH[c] "${query}"`)
  }

  function all() {
    return realm.objects(MODEL_NAME)
  }

  function find(id) {
    return realm.objects(MODEL_NAME).filtered(`id = ${id}`)[0];
  }

  function create(serializer) {
    let institution

    realm.write(() => {
      const country = Country.find(serializer.country_id)
      if(country != undefined) {
        // Android: files under `android/app/src/main/res/raw`
        // must be lowercase and underscored
        serializer.institution['country_id'] = serializer.country_id
        realm.create(MODEL_NAME, serializer.institution, 'modified');

        institution = serializer.institution;

        country.institutions.push(institution);
      }
    })

    return institution;
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

  function reloadBatch() {
    deleteBatch()
    Contact.deleteBatch()
    // createBatch()
  }

})()

export default Institution
