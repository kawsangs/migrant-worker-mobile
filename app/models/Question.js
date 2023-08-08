import realm from '../db/schema';
import Option from './Option';
import Answer from './Answer';
import Criteria from './Criteria';

const MODEL = 'Question';

const Question = (() => {
  return {
    getAll,
    deleteAll,
    isDownloaded,
    getPendingDownload,
    upsertCollection,
    upsert,
    byForm,
    findIndexNextQuestion,
    find,
    update,
  }

  function byForm(form_id) {
    return realm.objects(MODEL).filtered(`form_id=${form_id} SORT(display_order ASC)`);
  }

  function find(id) {
    return realm.objects(MODEL).filtered(`id=${id}`)[0];
  }

  function getAll() {
    return realm.objects(MODEL).filtered("SORT(display_order ASC)");
  }

  function deleteAll() {
    let collection = realm.objects(MODEL);

    if (collection.length > 0) {
      realm.write(() => {
        realm.delete(collection);
      });
    }
  }

  function isDownloaded() {
    return !!getAll().length && !getPendingDownload().length;
  }

  function getPendingDownload() {
    let collection = byPendingAudio();
    collection = collection.concat(byPendingPassingAudio());
    collection = collection.concat(byPendingFailingAudio());
    collection = collection.concat(Option.getPendingDownload());

    return collection;
  }

  function upsertCollection(items) {
    for(let i=0; i<items.length; i++) {
      upsert(items[i]);
    }
  }

  function upsert(item) {
    realm.write(() => {
      realm.create(MODEL, _buildData(item), 'modified');
    });

    Option.upsertCollection(item.options, item.code);
    Criteria.upsertCollection(item.criterias);
  }

  function update(id, data) {
    realm.write(() => {
      realm.create(MODEL, Object.assign(data, { id: id }), 'modified')
    });
  }

  // Private

  function _buildData(item) {
    return ({
      id: item.id,
      code: item.code,
      type: item.type,
      name: item.name,
      display_order: item.display_order,
      hint: item.hint,
      relevant: item.relevant,
      required: !!item.required,
      audio: item.audio,
      audio_url: item.audio_url,
      passing_score: item.passing_score,
      passing_message: item.passing_message,
      passing_audio: item.passing_audio,
      passing_audio_url: item.passing_audio_url,
      failing_message: item.failing_message,
      failing_audio: item.failing_audio,
      failing_audio_url: item.failing_audio_url,
      form_id: item.form_id,
    });
  }

  function byPendingAudio(option) {
    return byPending(`audio_url != null AND audio = null`, "audio");
  }

  function byPendingPassingAudio() {
    return byPending(`passing_audio_url != null AND passing_audio = null`, "passing_audio");
  }

  function byPendingFailingAudio() {
    return byPending(`failing_audio_url != null AND failing_audio = null`, "failing_audio");
  }

  function byPending(option="", type='audio') {
    let data = realm.objects(MODEL).filtered(option);

    return data.map(item => {
      return { uuid: item.id, url: item[`${type}_url`], type: type, obj: item };
    })
  }

  // -------------------------------Skip Logic start

  function findIndexNextQuestion(currentIndex=0, questions=[], quizUuid) {
    let nextIndex = currentIndex + 1;
    let question = questions[nextIndex];
    if (!question) { return -1; }

    let criterias = Criteria.byQuestion(question.id);
    if (!criterias.length || _hasRelevantResponse(question, quizUuid)) {
      return nextIndex;
    }

    return findIndexNextQuestion(nextIndex, questions, quizUuid);
  }

  function _hasRelevantResponse(question, quizUuid) {
    let criterias = Criteria.byQuestion(question.id);

    let isResponse = !!question.relevant && question.relevant.toLowerCase() == "and" ?
      criterias.reduce((sum, criteria) => sum && _hasResponseValue(criteria, quizUuid), true) :
      criterias.reduce((sum, criteria) => sum || _hasResponseValue(criteria, quizUuid), false);

    return isResponse;
  }

  function _hasResponseValue(criteria, quizUuid) {
    let answers = [];

    if (["=", "!="].includes(criteria.operator)) {
      answers = Answer.where(`question_code='${criteria.question_code}' AND value${criteria.operator}'${criteria.response_value}' AND quiz_uuid='${quizUuid}'`);
    }
    else if (["in", "match_all"].includes(criteria.operator)) {
      let responseValues = criteria.response_value.split(',');
      answers = Answer.where(`question_code='${criteria.question_code}' AND quiz_uuid='${quizUuid}'`);

      answers = criteria.operator == 'match_all' ?
        answers.filter(answer => responseValues.reduce((sum, val) => sum && answer.value.indexOf(val) > -1, true)) :
        answers.filter(answer => responseValues.reduce((sum, val) => sum || answer.value.indexOf(val) > -1, false));
    }

    return !!answers.length;
  }
  // -------------------------------Skip Logic end

})();

export default Question;
