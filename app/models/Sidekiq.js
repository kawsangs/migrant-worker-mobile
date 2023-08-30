import realm from '../db/schema';
import UserWorker from '../workers/user_worker';
import QuizWorker from '../workers/quiz_worker';
import AnswerWorker from '../workers/answer_worker';
import VisitWorker from '../workers/visit_worker';

const Sidekiq = (() => {
  return {
    upsert,
    destroy,
    uploadAll,
    getAll,
    deleteAll,
  }

  function getAll() {
    return realm.objects("Sidekiq");
  }

  function upsert(data) {
    realm.write(() => {
      realm.create('Sidekiq', data, 'modified');
    });
  }

  function destroy(paramUuid) {
    realm.write(() => {
      let obj = realm.objects('Sidekiq').filtered('paramUuid="' + paramUuid + '"')[0];
      realm.delete(obj);
    });
  }

  function deleteAll() {
    realm.write(() => {
      realm.delete(getAll());
    });
  }

  function uploadAll() {
    let worker = {
      User: UserWorker,
      Quiz: QuizWorker,
      Answer: AnswerWorker,
      Visit: VisitWorker,
    }

    let data = getAll();

    for(let i=0; i<data.length; i++) {
      worker[data[i].tableName].performAsync(data[i].paramUuid);
    }
  }
})();

export default Sidekiq;
