import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import Sidekiq from './Sidekiq';
import UserWorker from '../workers/user_worker';

const User = (() => {
  return {
    getAll,
    upsert,
    deleteAll,
    find,
    uploadAsync,
  }

  function find(uuid) {
    return realm.objects('User').filtered(`uuid='${uuid}'`)[0];
  }

  function getAll() {
    return realm.objects('User');
  }

  function upsert(data) {
    realm.write(() => {
      realm.create('User', data, 'modified');
    });
  }

  function deleteAll() {
    let collection = realm.objects('User');

    if (collection.length > 0) {
      realm.write(() => {
        realm.delete(collection);
      });
    }
  }

  function uploadAsync(uuid) {
    Sidekiq.upsert({paramUuid: uuid, tableName: 'User', version: '1'});

    UserWorker.performAsync(uuid);
  }
})();

export default User;
