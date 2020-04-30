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
  downloadPdf: function(pdfFilename) {
    return RNFetchBlob
      .config({
        path : `${RNFetchBlob.fs.dirs.DocumentDir}/${pdfFilename}.pdf`
      })
      .fetch('GET', `${environment.apiUrl}/pdfs/download?filename=${pdfFilename}.pdf`, {
        Authorization : `Bearer ${environment.access_token}`
      });
  }
}
