import AsyncStorage from '@react-native-async-storage/async-storage';
import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import Sidekiq from './Sidekiq';
import VisitWorker from '../workers/visit_worker';

const MODEL = 'Visit'

const Visit = (() => {
  return {
    find,
    upsert,
    deleteByUuid,
    deleteAll,
    upload,
    uploadPageVisit,
    uploadDepartureDetailVisit,
    uploadSafetyDetailVisit,
    uploadFindHelpDetailVisit,
    uploadYourStoryDetailVisit,
  }

  function find(uuid) {
    return realm.objects(MODEL).filtered(`uuid = '${uuid}'`)[0];
  }

  async function upsert(data, uuid) {
    const user = JSON.parse(await AsyncStorage.getItem('CURRENT_USER'));
    realm.write(() => {
      realm.create(MODEL, {...data, uuid: uuid || uuidv4(), visit_date: new Date(), user_uuid: !!user ? user.uuid : null}, 'modified');
    });
  }

  function deleteByUuid(uuid) {
    const item = find(uuid);
    if (!!item)
      realm.write(() => {
        realm.delete(item);
      })
  }

  function deleteAll() {
    const collection = realm.objects(MODEL);
    if (collection.length > 0)
      realm.write(() => {
        realm.delete(collection);
      })
  }

  function upload(data) {
    const uuid = uuidv4();
    upsert(data, uuid);
    uploadAsync(uuid);
  }

  function uploadAsync(uuid) {
    Sidekiq.upsert({paramUuid: uuid, tableName: MODEL, version: '1'});
    VisitWorker.performAsync(uuid);
  }

  function uploadPageVisit(code, name) {
    upload({
      pageable_type: 'Page',
      code: code,
      name: name,
    });
  }

  // pageableId is the category's ID
  function uploadDepartureDetailVisit(pageableId, name) {
    upload(_getVisitCategoryData('departure', pageableId, name));
  }

  // pageableId is the category's ID
  function uploadSafetyDetailVisit(pageableId, name) {
    upload(_getVisitCategoryData('safety', pageableId, name));
  }

  // pageableId is the country's ID or institution's ID
  function uploadFindHelpDetailVisit(pageableType, pageableId, name) {
    upload({
      pageable_type: pageableType,
      pageable_id: pageableId,
      code: 'find_help_detail',
      name: name,
      parent_code: 'find_help'
    });
  }

  // pageableId is the form's ID
  function uploadYourStoryDetailVisit(pageableId, name) {
    upload({
      pageable_type: 'Form',
      pageable_id: pageableId,
      code: 'your_story_detail',
      name: name,
      parent_code: 'your_story'
    });
  }

  // private method
  function _getVisitCategoryData(type, pageableId, name) {
    const params = {
      pageable_type: 'Category',
      pageable_id: pageableId,
      name: name,
    }

    if (type == 'departure')
      return {...params, code: 'your_departure_detail', parent_code: 'your_departure'};

    return {...params, code: 'your_safety_detail', parent_code: 'your_safety'};
  }
})()

export default Visit;