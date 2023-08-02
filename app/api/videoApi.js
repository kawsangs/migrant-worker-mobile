import { Api } from '../utils/api';

class VideoApi {
  load = (page, successCallback, failureCallback) => {
    Api.get('/videos', {page: page})
      .then(res => {
        !!successCallback && successCallback(res.data)
      })
      .catch(error => {
        !!failureCallback && failureCallback(error)
      })
  }
}

export default VideoApi