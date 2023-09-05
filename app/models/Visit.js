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
    uploadVideoDetailVisit,
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
  function uploadDepartureDetailVisit(pageableId) {
    upload({
      pageable_type: 'Category',
      pageable_id: pageableId.toString(),
      code: 'your_departure_detail',
      name: 'ដំណើរឆ្លងដែនរបស់អ្នក',
      parent_code: 'your_departure'
    });
  }

  // pageableId is the category's ID
  function uploadSafetyDetailVisit(pageableId) {
    upload({
      pageable_type: 'Category',
      pageable_id: pageableId.toString(),
      code: 'your_safety_detail',
      name: 'សុវត្តិភាពរបស់អ្នក',
      parent_code: 'your_safety'
    });
  }

  // pageableId is the country's ID or institution's ID
  function uploadFindHelpDetailVisit(pageableType, pageableId) {
    upload({
      pageable_type: pageableType,
      pageable_id: pageableId.toString(),
      code: 'find_help_detail',
      name: 'ស្វែងរកជំនួយ',
      parent_code: 'find_help'
    });
  }

  // pageableId is the form's ID
  function uploadYourStoryDetailVisit(pageableId) {
    upload({
      pageable_type: 'Form',
      pageable_id: pageableId.toString(),
      code: 'your_story_detail',
      name: 'សាច់រឿងរបស់អ្នក',
      parent_code: 'your_story'
    });
  }

  function uploadVideoDetailVisit(pageableId) {
    upload({
      pageable_type: 'Video',
      pageable_id: pageableId.toString(),
      code: 'video_detail',
      name: 'វីដេអូ',
      parent_code: 'video'
    });
  }
})()

export default Visit;