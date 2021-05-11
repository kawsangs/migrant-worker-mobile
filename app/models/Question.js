import realm from '../db/schema';
import Option from '../models/Option';

const Question = (() => {
  return {
    getAll,
    deleteAll,
    isDownloaded,
    getPendingDownload,
    upsertCollection,
    upsert,
    byForm,
  }

  function byForm(form_id) {
    return realm.objects('Question').filtered(`form_id=${form_id}`);
  }

  function getAll() {
    return realm.objects('Question');
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
})();

export default Question;
