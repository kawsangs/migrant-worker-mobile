import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import Sidekiq from './Sidekiq';
import QuizWorker from '../workers/quiz_worker';

const Quiz = (() => {
  return {
    getAll,
    upsert,
    find,
    deleteAll,
    uploadAsync,
  }

  function find(uuid) {
    return realm.objects("Quiz").filtered(`uuid='${uuid}'`)[0];
  }

  function getAll() {
    return realm.objects('Quiz');
  }

  function upsert(data) {
    realm.write(() => {
      realm.create('Quiz', data, 'modified');
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

  function uploadAsync(uuid) {
    Sidekiq.upsert({paramUuid: uuid, tableName: 'Quiz', version: '1'});

    QuizWorker.performAsync(uuid);
  }
})();

export default Quiz;
