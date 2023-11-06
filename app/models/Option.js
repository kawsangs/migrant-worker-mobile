import realm from '../db/schema';

const Option = (() => {
  return {
    getAll,
    deleteAll,
    deleteAllByQuestionId,
    isDownloaded,
    getPendingDownload,
    upsertCollection,
    upsert,
    byQuestion,
  }

  function byQuestion(question_id) {
    return realm.objects('Option').filtered(`question_id=${question_id}`);
  }

  function getAll() {
    return realm.objects('Option');
  }

  function deleteAll() {
    let collection = realm.objects('Option');

    if (collection.length > 0) {
      realm.write(() => {
        realm.delete(collection);
      });
    }
  }

  function deleteAllByQuestionId(questionId) {
    const options = byQuestion(questionId);
    if (options.length > 0) {
      realm.write(() => {
        realm.delete(options);
      });
    }
  }

  function getPendingDownload() {
    let data = realm.objects('Option').filtered(`alert_audio_url != null AND alert_audio = null`);

    return data.map(item => {
      return { uuid: item.id, url: item.alert_audio_url, type: 'alert_audio', obj: item };
    })
  }

  function isDownloaded() {
    return !!getAll().length && !getPendingDownload().length;
  }

  function upsertCollection(items, question_code) {
    for(let i=0; i<items.length; i++) {
      upsert(items[i], question_code);
    }
  }

  function upsert(item, question_code) {
    realm.write(() => {
      realm.create('Option', _buildData(item, question_code), 'modified');
    });
  }

  function _buildData(item, question_code) {
    let params = {
      id: item.id,
      name: item.name,
      value: item.value,
      score: item.score || 0,
      alert_message: item.alert_message,
      alert_audio: item.alert_audio,
      alert_audio_url: item.alert_audio_url,
      warning: !!item.warning,
      recursive: !!item.recursive,
      question_id: item.question_id,
      question_code: question_code,
      icon: item.icon || null
    };

    if (!!item.offline && !!item.image_url) {
      params.image = 'offline'
    }

    return params;
  }
})();

export default Option;
