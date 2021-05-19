import realm from '../db/schema'
import contacts from '../data/json/contacts'

const ModelName = 'Contact'
const Contact = (() => {
  return {
    all,
    where,
    create,
    deleteBatch,
    createBatch,
  }

  function createBatch() {
    contacts.forEach(contact => create(contact))
  }

  function where(field, query) {
    return all().filtered(`${field} BEGINSWITH[c] "${query}"`)
  }

  function all() {
    return realm.objects(ModelName)
  }

  function create(contact) {
    realm.write(() => {
      realm.create(ModelName, contact);
    })
  }

  function deleteBatch() {
    realm.write(() => {
      realm.delete(all())
    })
  }

})()

export default Contact
