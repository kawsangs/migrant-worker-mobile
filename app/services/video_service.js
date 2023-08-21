import WebService from './web_service';
import {itemsPerPage} from '../constants/sync_data_constant';
import Video from '../models/Video';
import endpointHelper from '../helpers/endpoint_helper';

class VideoService extends WebService {
  constructor() {
    super();
  }

  syncAll(successCallback, failureCallback) {
    this._syncAndRemoveByPage(1, 1, successCallback, failureCallback)
  }

  // private method
  _syncAndRemoveByPage(page, totalPage, successCallback, failureCallback, prevVideos = []) {
    if (page > totalPage) {
      Video.deleteAll();
      prevVideos.map(video => Video.create(video));
      !!successCallback && successCallback();
      return
    }

    this.get(endpointHelper.pagingEndpoint('videos', page))
      .then(res => JSON.parse(res.data))
      .then(data => {
        const allPage = Math.ceil(data.pagy.count / itemsPerPage)
        this._syncAndRemoveByPage(page+1, allPage, successCallback, failureCallback, [...prevVideos, ...data.videos]);
      })
      .catch(error => !!failureCallback && failureCallback())
  }
}

export default VideoService;