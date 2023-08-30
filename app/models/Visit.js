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
})()

export default Visit;