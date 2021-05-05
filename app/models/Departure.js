import realm from '../db/schema';
import ImageDownloader from '../downloaders/image_downloader';

const Departure = (() => {
  return {
    getAll,
    getRoots,
    getPendingDownload,
    update,
    upsertCollection,
    deleteAll,
    downloadImage,
    downloadAudio,
    isDownloaded,
 }

  function isDownloaded() {
    console.log(getPendingDownload())
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
    realm.write(() => {
      for(let i=0; i<categories.length; i++) {
        upsert(categories[i]);
      }
    });
  }

  function upsert(category) {
    realm.create('Category', _buildData(category), 'modified');

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
    return byPendingImage().concat(byPendingAudio());
  }

  function parseJson(realmObjects) {
    return JSON.parse(JSON.stringify(realmObjects));
  }

  function byPendingImage() {
    let categories = realm.objects('Category').filtered(`type='Departure' AND image_url != null AND image = null`);
    return categories.map(c => {
      return { uuid: c.uuid, url: c.image_url, type: 'image' };
    })
  }

  function byPendingAudio() {
    let categories = realm.objects('Category').filtered(`type='Departure' AND audio_url != null AND audio = null`);
    return categories.map(c => {
      return { uuid: c.uuid, url: c.audio_url, type: 'audio' }
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

    return [
      {
        title_en: 'Prepare your trip',
        title_kh: 'រៀបចំដំណើររបស់អ្នក',
        image: require('../assets/images/icons/before_you_go_prepare_your_trip.png'),
        screenName: 'PreDepartureListScreen',
        imageWidth: '480',
        imageHeight: '360',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Migration',
        title_kh: 'ចំណាកស្រុក',
        image: require('../assets/images/icons/before_you_go_migration.png'),
        screenName: 'MigrationScreen',
        imageWidth: '300',
        imageHeight: '372',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Coming Home',
        title_kh: 'ដំណើរវិលត្រឡប់',
        image: require('../assets/images/icons/before_you_go_coming_home.png'),
        screenName: 'ComingHomeScreen',
        imageWidth: '440',
        imageHeight: '344',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Video',
        title_kh: 'វីដេអូ',
        image: require('../assets/images/icons/before_you_go_video.png'),
        screenName: 'BeforeYouGoVideoScreen',
        imageWidth: '440',
        imageHeight: '344',
        audioFileName: '',
        backgroundColor: Color.red
      },
    ];
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
