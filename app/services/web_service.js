import RNFetchBlob from 'rn-fetch-blob'
import { environment } from '../config/environment';

const authorizationToken = `Bearer ${environment.access_token}`;

const webService = (() => {
  return {
    get,
    post,
    put,
  }

  function get(endpoint) {
    return RNFetchBlob.fetch('GET', `${environment.apiUrl}${endpoint}`, {
              Authorization : authorizationToken,
              'Content-Type' : 'application/json',
           })
  }

  function post(endpoint, data, contentType = null) {
    return _request('POST', endpoint, data, contentType);
  }

  function put(endpoint, data, contentType = null) {
    return _request('PUT', endpoint, data, contentType);
  }

  // private method
  function _request(method, endpoint, data, contentType) {
    return RNFetchBlob.fetch(method, `${environment.apiUrl}/${_getEndpoint(endpoint)}`, {
              Authorization: authorizationToken,
              'Content-Type' : contentType || 'multipart/form-data',
            }, data)
  }

  function _getEndpoint(endpoint) {
    return endpoint[0] == '/' ? endpoint.replace('/', '') : endpoint;
  }
})();

export default webService;