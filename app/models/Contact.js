import realm from '../db/schema'
import contacts from '../data/json/contacts'

const MODEL_NAME = 'Contact'
const Contact = (() => {
  return {
    all,
    where,
    create,
    deleteBatch,
    createBatch,
  }

  function createBatch() {
    [].forEach(contact => create(contact))
  }

  function where(field, query) {
    return all().filtered(`${field} BEGINSWITH[c] "${query}"`)
  }

  function all() {
    return realm.objects(MODEL_NAME)
  }

  function create(contact) {
    realm.write(() => {
      realm.create(MODEL_NAME, contact);
    })
  }

  function deleteBatch() {
    realm.write(() => {
      realm.delete(all())
    })
  }

})()

export default Contact
