import realm from '../db/schema';
import ImageDownloader from '../downloaders/image_downloader';
import CategoryImage from '../models/CategoryImage';

const Departure = (() => {
  return {
    getAll,
    getRoots,
    getChildren,
    getPendingDownload,
    update,
    upsertCollection,
    deleteAll,
    downloadImage,
    downloadAudio,
    isDownloaded,
  }

  function getChildren(parent_id) {
    return realm.objects('Category').filtered(`parent_id=${parent_id} SORT(lft ASC)`);
  }

  function isDownloaded() {
    return !!getAll().length && !getPendingDownload().length;
  }

  function deleteAll() {
    let categories = realm.objects('Category').filtered(`type = 'Departure'`);

    if (categories.length > 0) {
      realm.write(() => {
        realm.delete(categories);
      });
    }
  }

  function upsertCollection(categories) {
    for(let i=0; i<categories.length; i++) {
      upsert(categories[i]);
    }
  }

  function upsert(category) {
    realm.write(() => {
      realm.create('Category', _buildData(category), 'modified');
    });

    CategoryImage.upsertCollection(category.category_images);

    for (let i=0; i<category.children.length; i++) {
      upsert(category.children[i]);
    }
  }

  function _buildData(category) {
    return ({
      uuid: category.uuid,
      id: category.id,
      name: category.name,
      image_url: category.image_url,
      audio_url: category.audio_url,
      description: category.description,
      type: 'Departure',
      parent_id: category.parent_id,
      last: category.last,
      leaf: category.leaf,
      lft: category.lft,
      rgt: category.rgt,
    });
  }

  function getPendingDownload() {
    let collection = byPendingImage().concat(byPendingAudio());

    return collection.concat(CategoryImage.getPendingDownload());
  }

  function parseJson(realmObjects) {
    return JSON.parse(JSON.stringify(realmObjects));
  }

  function byPendingImage() {
    let categories = realm.objects('Category').filtered(`type='Departure' AND image_url != null AND image = null`);
    return categories.map(c => {
      return { uuid: c.uuid, url: c.image_url, type: 'image', obj: c };
    })
  }

  function byPendingAudio() {
    let categories = realm.objects('Category').filtered(`type='Departure' AND audio_url != null AND audio = null`);
    return categories.map(c => {
      return { uuid: c.uuid, url: c.audio_url, type: 'audio', obj: c }
    })
  }

  function update(uuid, params={}) {
    realm.write(() => {
      realm.create('Category', Object.assign(params, {uuid: uuid}), 'modified');
    })
  }

  function getRoots() {
    return realm.objects('Category').filtered(`type='Departure' AND parent_id=null SORT(lft ASC)`);
  }

  function getAll() {
    return realm.objects('Category').filtered(`type='Departure'`);
  }

  function downloadImage(category={}, successCallback, failsCallback) {
    ImageDownloader.download(_getFileName(category), category.url, successCallback, failsCallback);
  }

  function downloadAudio(category={}, successCallback, failsCallback) {
    AudioDownloader.download(_getFileName(category), category.url, successCallback, failsCallback);
  }

  function _getFileName(category={}) {
    let fileNames = category.url.split('/');
    return `${category.type}_${category.uuid}_${fileNames[fileNames.length - 1]}`;
  }
})();

export default Departure;
