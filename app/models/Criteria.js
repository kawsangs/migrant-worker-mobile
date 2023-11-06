import realm from '../db/schema';

const Criteria = (() => {
  return {
    getAll,
    deleteAll,
    deleteAllByQuestionId,
    upsertCollection,
    upsert,
    byQuestion,
  }

  function byQuestion(question_id) {
    return realm.objects('Criteria').filtered(`question_id=${question_id}`);
  }

  function getAll() {
    return realm.objects('Criteria');
  }

  function deleteAll() {
    let collection = realm.objects('Criteria');

    if (collection.length > 0) {
      realm.write(() => {
        realm.delete(collection);
      });
    }
  }

  function deleteAllByQuestionId(questionId) {
    const criterias = byQuestion(questionId);
    if (criterias.length > 0) {
      realm.write(() => {
        realm.delete(criterias);
      });
    }
  }

  function upsertCollection(items) {
    for(let i=0; i<items.length; i++) {
      upsert(items[i]);
    }
  }

  function upsert(item) {
    realm.write(() => {
      realm.create('Criteria', _buildData(item), 'modified');
    });
  }

  function _buildData(item) {
    return ({
      id: item.id,
      question_id: item.question_id,
      question_code: item.question_code,
      operator: item.operator,
      response_value: item.response_value,
    });
  }
})();

export default Criteria;
