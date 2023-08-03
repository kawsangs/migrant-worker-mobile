import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import videos from '../db/json/videos.json';

const MODEL = 'Video';

const Video = (() => {
  return {
    getAll,
    seedData,
    create,
    findByTag,
    getTags,
    deleteAll,
  }

  function getAll() {
    return realm.objects(MODEL).sorted('display_order', false)
  }

  function isExisted() {
    return getAll().length > 0
  }

  function seedData() {
    if (isExisted()) return;

    videos.map(video => {
      create(video);
    })
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, _getFormattedVideo(data))
    })
  }

  function findByTag(tag) {
    return realm.objects(MODEL).filtered(`tag_list CONTAINS[c] '${tag}'`).sorted('display_order', false);
  }

  function getTags() {
    let tags = [];
    getAll().map(video => {
      video.tag_list.split(',').map(tag => { tags.push(tag) })
    });
    if (tags[0] == "") tags[0] = "ទាំងអស់";
    return [...new Set(tags)];
  }

  function deleteAll() {
    const videos = getAll()
    if (videos.length > 0)
      realm.write(() => realm.delete(videos))
  }

  // private method
  function _getFormattedVideo(video) {
    return {...video, author: video.video_author.name, uuid: uuidv4()}
  }
})();

export default Video;