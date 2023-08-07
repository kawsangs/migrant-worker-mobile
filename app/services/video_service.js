import webService from './web_service';
import {itemsPerPage} from '../constants/sync_data_constant';
import Video from '../models/Video';

const videoService = (() => {
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

    webService.get(`/videos?page=${page}`)
      .then(res => JSON.parse(res.data))
      .then(data => {
        const allPage = Math.ceil(data.pagy.count / itemsPerPage)
        _syncAndRemoveByPage(page+1, allPage, successCallback, failureCallback, [...prevVideos, ...data.videos]);
      })
      .catch(error => !!failureCallback && failureCallback())
  }
})();

export default videoService;