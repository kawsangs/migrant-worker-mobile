import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

const Answer = (() => {
  return {
    getAll,
    upsert,
    where,
    deleteAll,
    byQuiz,
    find,
  }

  function find(uuid) {
    return realm.objects('Answer').filtered(`uuid='${uuid}'`)[0];
  }

  function getAll() {
    return realm.objects('Answer');
  }

  function byQuiz(quizUuid) {
    return realm.objects('Answer').filtered(`quiz_uuid='${quizUuid}'`);
  }

  function upsert(data) {
    realm.write(() => {
      realm.create('Answer', data, 'modified');
    });
  }

  function where(queryString="") {
    return realm.objects('Answer').filtered(queryString);
  }

  function deleteAll() {
    let collection = realm.objects('Answer');

    if (collection.length > 0) {
      realm.write(() => {
        realm.delete(collection);
      });
    }
  }
})();

export default Answer;
