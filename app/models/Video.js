import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import videos from '../db/json/videos.json';

const MODEL = 'Video';

const Video = (() => {
  return {
    getAll,
    seedData,
    create,
  }

  function getAll() {
    return realm.objects(MODEL)
  }

  function seedData() {
    videos.map(video => {
      create(_getFormattedVideo(video));
    })
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, {...data, uuid: uuidv4()})
    })
  }

  // private method
  function _getFormattedVideo(video) {
    return {...video, author: video.video_author.name}
  }
})();

export default Video;