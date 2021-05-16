import realm from '../db/schema';
import Option from './Option';
import Answer from './Answer';
import Criteria from './Criteria';

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
  }

  function byForm(form_id) {
    return realm.objects('Question').filtered(`form_id=${form_id} SORT(display_order ASC)`);
  }

  function getAll() {
    return realm.objects('Question').filtered("SORT(display_order ASC)");
  }

  function deleteAll() {
    let collection = realm.objects('Question');

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
      realm.create('Question', _buildData(item), 'modified');
    });

    Option.upsertCollection(item.options, item.code);
    Criteria.upsertCollection(item.criterias);
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
      required: item.required,
      audio_url: item.audio_url,
      passing_score: item.passing_score,
      passing_message: item.passing_message,
      passing_audio_url: item.passing_audio_url,
      failing_message: item.failing_message,
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
    let data = realm.objects('Question').filtered(option);

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
    let isShow = hasResponseValue(criterias[0], quizUuid);

    if (criterias.length == 1) {
      return isShow;
    }

    if (question.relevant == "AND") {
      for(let i=1; i<criterias.length; i++) {
        isShow = isShow && hasResponseValue(criterias[i], quizUuid);
      }
    } else {
      for(let i=1; i<criterias.length; i++) {
        isShow = isShow || hasResponseValue(criterias[i], quizUuid);
      }
    }

    return isShow;
  }

  function hasResponseValue(critera, quizUuid) {
    let questionCode = critera.question_code;
    let operator = critera.operator;
    let values = critera.response_value;

    let answers = [];

    if (["=", "!="].includes(operator)) {
      answers = Answer.where(`question_code='${questionCode}' AND value${operator}'${values}' AND quiz_uuid='${quizUuid}'`);
    } else if (operator == 'in') {
      console.log("critera========", JSON.stringify(critera));
      console.log("questionCode=======", questionCode);
      console.log("quizUuid=======", quizUuid);

      values = values.split(',');
      answers = Answer.where(`question_code='${questionCode}' AND quiz_uuid='${quizUuid}'`);
      answers = answers.filter(answer => !!answer.value.split(',').filter(v => values.includes(v)).length );
    }
    return !!answers.length;
  }
  // -------------------------------Skip Logic end

})();

export default Question;
