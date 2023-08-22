import realm from '../db/schema';

import Question from '../models/Question';
import Option from '../models/Option';
import Criteria from '../models/Criteria';
import formList from '../db/json/form_stories';
import DeviceInfo from 'react-native-device-info';

const MODEL = 'Form';

const Form = (() => {
  return {
    getAll,
    getAllYourStory,
    isDownloaded,
    deleteAllWithDependency,
    deleteAll,
    getPendingDownload,
    upsertCollection,
    upsert,
    seedYourStoryData,
    findNext,
    findById,
  }

  function findById(id) {
    return realm.objects(MODEL).filtered(`id = ${id}`)[0];
  }

  function findNext(formId) {
    let forms = getAll();
    let currentIndex = forms.findIndex(f => f.id == formId);

    return currentIndex < forms.length - 1 ? forms[currentIndex + 1] : null;
  }

  function getPendingDownload() {
    return Question.getPendingDownload();
  }

  function getAll() {
    return realm.objects(MODEL);
  }

  function getAllYourStory() {
    return realm.objects(MODEL).filtered(`type == 'your_story' || type == ''`);
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
    let collection = realm.objects(MODEL);

    if (collection.length > 0) {
      realm.write(() => {
        realm.delete(collection);
      });
    }
  }

  function upsertCollection(items, appVersion) {
    for(let i=0; i<items.length; i++) {
      upsert(items[i], appVersion);
    }
  }

  function upsert(item, appVersion, autoSaveQuestions = true) {
    realm.write(() => {
      realm.create(MODEL, _buildData(item, appVersion), 'modified');
    });

    if (!!autoSaveQuestions)
      Question.upsertCollection(item.questions);
  }

  function _buildData(item, appVersion) {
    let params = {
      id: item.id,
      code: item.code,
      name: item.name,
      audio: item.audio,
      version: item.version,
      question_count: !!item.question_count ? item.question_count : item.questions.length,
      appVersion: appVersion,
      type: item.type || 'your_story',
    };

    if (!!item.offline && !!item.image_url) {
      params.image = 'offline'
    }

    return params;
  }

  function seedYourStoryData(callback) {
    let appVersion = DeviceInfo.getVersion();
    let collection = getAllYourStory().filter(o => o.appVersion == appVersion);
    if (!!collection.length) {
      !!callback && callback();
      return;
    }

    setTimeout(() => {
      realm.write(() => {
        realm.delete(collection);
      });
      upsertCollection(formList, appVersion);
      !!callback && callback();
    }, 200);
  }

})();

export default Form;
