import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

const Quiz = (() => {
  return {
    getAll,
    upsert,
    find,
    deleteAll,
  }

  function find(uuid) {
    return realm.objects("Quiz").filtered(`uuid='${uuid}'`)[0];
  }

  function getAll() {
    return realm.objects('Quiz');
  }

  function upsert(data) {
    realm.write(() => {
      return realm.create('Quiz', data, 'modified');
    });
  }

  function deleteAll() {
    let collection = realm.objects('Quiz');

    if (collection.length > 0) {
      realm.write(() => {
        realm.delete(collection);
      });
    }
  }
})();

export default Quiz;
