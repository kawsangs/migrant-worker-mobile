import VideoApi from '../api/videoApi';
import {itemsPerPage} from '../constants/sync_data_constant';
import Video from '../models/Video';

const videoSyncService = (() => {
  return {
    syncAll,
  }

  function syncAll(successCallback, failureCallback) {
    _syncAndRemoveByPage(1, 1, successCallback, failureCallback)
  }

  // private method
  function _syncAndRemoveByPage(page, totalPage, successCallback, failureCallback, prevVideos = []) {
    if (page > totalPage) {
      Video.deleteAll();
      prevVideos.map(video => Video.create(video));
      !!successCallback && successCallback();
      return
    }

    new VideoApi().load(page, (res) => {
      const allPage = Math.ceil(res.pagy.count / itemsPerPage)
      _syncAndRemoveByPage(page+1, allPage, successCallback, failureCallback, [...prevVideos, ...res.videos]);
    }, (error) => {
      !!failureCallback && failureCallback();
    })
  }
})();

export default videoSyncService;