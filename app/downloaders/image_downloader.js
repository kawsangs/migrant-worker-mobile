import { environment } from '../config/environment';
import RNFS from 'react-native-fs';

const ImageDownloader = (()=> {
  return {
    download: download,
  }

  async function download(fileName, filePath, successCallback, failsCallback) {
    let options = {
      fromUrl: `${environment.domain}/${filePath}`,
      toFile: `${RNFS.DocumentDirectoryPath}/${fileName}`,
    };

    await RNFS.downloadFile(options).promise.then(res => {
      !!successCallback && successCallback(options.toFile);
    }).catch(err => {
      console.log('=============download image error', err);
      !!failsCallback && failsCallback();
    });
  }

})();

export default ImageDownloader;