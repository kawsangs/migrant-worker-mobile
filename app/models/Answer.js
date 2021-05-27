import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import Sidekiq from './Sidekiq';
import AnswerWorker from '../workers/answer_worker';

const Answer = (() => {
  return {
    getAll,
    upsert,
    where,
    deleteAll,
    byQuiz,
    find,
    uploadVoiceAnsync,
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

  function uploadVoiceAnsync(quizUuid) {
    let voiceAnswers = byQuiz(quizUuid).filter(o => !!o.voice);

    for(let i=0; i<voiceAnswers.length; i++) {
      uploadAsync(voiceAnswers[i].uuid);
    }
  }

  function uploadAsync(uuid) {
    Sidekiq.upsert({paramUuid: uuid, tableName: 'Answer', version: '1'});

    AnswerWorker.performAsync(uuid);
  }
})();

export default Answer;
