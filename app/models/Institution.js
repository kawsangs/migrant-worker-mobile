import realm from '../db/schema'
import institutions from '../data/json/institutions'
import Contact from './Contact'
import _ from 'underscore'
import uuidv4 from '../utils/uuidv4';
import CountryInstitution from './CountryInstitution';

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

  function createBatch() {
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
    realm.write(() => {
      let contacts = []
      serializer.contacts.map(contact => {
        contacts.push(JSON.stringify(contact))
      });

      const params = {
        id: serializer.id,
        name: serializer.name,
        kind: serializer.kind,
        address: serializer.address,
        logo_url: serializer.logo_url,
        audio_url: serializer.audio_url,
        contacts: contacts,
      }

      realm.create(MODEL_NAME, params, 'modified');
    });

    serializer.country_institutions.map(countryInstitution => {
      const data = {
        uuid: uuidv4(),
        country_id: countryInstitution.country_id,
        institution_id: serializer.id
      };

      CountryInstitution.create(data);
    });
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
    createBatch()
  }

})()

export default Institution
