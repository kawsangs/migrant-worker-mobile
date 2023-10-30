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
    isExist,
    deleteBatch,
    deleteItem,
    createBatch,
    reloadBatch,
    hasDisplayOrder,
  }

  function createBatch() {
    return _.map( institutions, (serializer, index) => create({...serializer, offline: true}, index))
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

  function create(item, index) {
    realm.write(() => {
      realm.create(MODEL_NAME, _buildData(item, index), 'modified');
    });

    if (item.country_institutions) {
      item.country_institutions.map(countryInstitution => {
        const data = {
          uuid: uuidv4(),
          country_code: countryInstitution.country_code,
          institution_id: parseInt(item.id)
        };

        CountryInstitution.create(data);
      });
    }
  }

  function update(id, params) {
    realm.write(() => {
      realm.create(MODEL_NAME, Object.assign(params, {id: id}), 'modified');
    });
  }

  function isExist(id) {
    return find(id) ? true : false;
  }

  function deleteBatch() {
    realm.write(() => {
      realm.delete(all())
    })
  }

  function deleteItem(item) {
    realm.write(() => {
      realm.delete(item)
    })
  }

  function reloadBatch() {
    CountryInstitution.deleteBatch()
    deleteBatch()
    Contact.deleteBatch()
    createBatch()
  }

  function hasDisplayOrder() {
    const institutions = all();
    for (let i = 0; i < institutions.length; i++) {
      if (!institutions[i].display_order)
        return false;
    }

    return true;
  }

  function _buildData(item, index) {
    let contacts = []
    item.contacts.map(contact => {
      contacts.push(JSON.stringify(contact))
    });

    let params = {
      id: item.id,
      name: item.name,
      name_km: item.name_km,
      address: item.address,
      logo_url: item.logo_url,
      audio_url: item.audio_url,
      contacts: contacts,
      display_order: item.display_order ? item.display_order : index + 1,
    }

    if (!!item.offline && !!item.logo_url)
      params.logo = 'offline';

    return params;
  }

})()

export default Institution
