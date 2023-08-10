import RNFetchBlob from 'rn-fetch-blob'
import { environment } from '../config/environment';

const authorizationToken = `Bearer ${environment.access_token}`;

class WebService {
  get(endpoint) {
    return RNFetchBlob.fetch('GET', endpoint, {
              Authorization : authorizationToken,
              'Content-Type' : 'application/json',
           })
  }

  post(endpoint, data, contentType = null) {
    return this._request('POST', endpoint, data, contentType)
  }

  put(endpoint, data, contentType = null) {
    return this._request('PUT', endpoint, data, contentType);
  }

  // private method
  _request(method, endpoint, data, contentType) {
    return RNFetchBlob.fetch(method, endpoint, {
              Authorization: authorizationToken,
              'Content-Type' : contentType || 'multipart/form-data',
            }, data)
  }
}

export default WebService;