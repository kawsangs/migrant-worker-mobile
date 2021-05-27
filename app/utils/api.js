import { create } from 'apisauce';
import { environment } from '../config/environment';
import RNFetchBlob from 'rn-fetch-blob'

export const Api = create({
  baseURL: environment.apiUrl,
  headers: {
    'Authorization': `Bearer ${environment.access_token}`
  }
});

export const ApiBlob = {
  post: function(endpint, data) {
    return RNFetchBlob.fetch('POST', `${environment.apiUrl}${endpint}`, {
      Authorization : `Bearer ${environment.access_token}`,
      'Content-Type' : 'multipart/form-data',
    }, data)
  },
  put: function(endpint, data) {
    return RNFetchBlob.fetch('PUT', `${environment.apiUrl}${endpint}`, {
      Authorization : `Bearer ${environment.access_token}`,
      'Content-Type' : 'multipart/form-data',
    }, data)
  }
}
