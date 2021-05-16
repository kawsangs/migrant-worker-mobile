import realm from '../db/schema';

import Question from '../models/Question';
import Option from '../models/Option';
import Criteria from '../models/Criteria';

const Form = (() => {
  return {
    getAll,
    isDownloaded,
    deleteAllWithDependency,
    deleteAll,
    getPendingDownload,
    upsertCollection,
    upsert,
  }

  function getPendingDownload() {
    return Question.getPendingDownload();
  }

  function getAll() {
    return realm.objects('Form');
  }

  function isDownloaded() {
    return !!getAll().length && !Question.getPendingDownload().length;
  }

  function deleteAllWithDependency() {
    deleteAll();
    Question.deleteAll();
    Option.deleteAll();
    Criteria.deleteAll();
  }

  function deleteAll() {
    let collection = realm.objects('Form');

    if (collection.length > 0) {
      realm.write(() => {
        realm.delete(collection);
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
      realm.create('Form', _buildData(item), 'modified');
    });

    Question.upsertCollection(item.questions);
  }

  function _buildData(item) {
    return ({
      id: item.id,
      name: item.name,
      form_type: item.form_type,
      version: item.version,
      question_count: item.questions.length
    });
  }

})();

export default Form;
