import { Api } from '../utils/api';

class VideoApi {
  load = (successCallback, failureCallback) => {
    console.log('==== start fetch videos ====')
    Api.get('/videos')
      .then(res => {
        console.log('=== success get videos = ', res)
        !!successCallback && successCallback(res)
      })
      .catch(error => {
        console.log('==== Error get videos === ', error)
        !!failureCallback && failureCallback(error)
      })
  }
}

export default VideoApi