import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

const User = (() => {
  return {
    getAll,
    upsert,
    deleteAll,
    find,
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
})();

export default User;
