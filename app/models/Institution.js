import realm from '../db/schema'
import Country from './Country'
import institutions from '../data/json/institutions'
import Contact from './Contact'

const MODEL_NAME = 'Institution'
const Institution = (() => {
  return {
    all,
    where,
    create,
    deleteBatch,
    createBatch,
    reloadBatch,
  }

  function createBatch() {
    institutions.forEach(serializer => create(serializer))
  }

  function where(field, query) {
    return all().filtered(`${field} BEGINSWITH[c] "${query}"`)
  }

  function all() {
    return realm.objects(MODEL_NAME)
  }

  function create(serializer) {
    realm.write(() => {
      const country = Country.find(serializer.country_id)
      if(country != undefined) {
        // Android: files under `android/app/src/main/res/raw`
        // must be lowercase and underscored
        const institution = realm.create(MODEL_NAME, serializer.institution, 'modified');
        country.institutions.push(institution);
      }
    })
  }

  function deleteBatch() {
    realm.write(() => {
      realm.delete(all())
    })
  }

  function reloadBatch() {
    deleteBatch()
    Contact.deleteBatch()
    createBatch()
  }

})()

export default Institution
