import { environment } from '../config/environment';
import RNFS from 'react-native-fs';

const AudioDownloader = (()=> {
  return {
    download: download
  }

  async function download(dirName, filePath, successCallback, failsCallback) {
    let options = {
      fromUrl: `${environment.domain}/${filePath}`,
      toFile: `${RNFS.DocumentDirectoryPath}/${dirName}/audios/${getFileName(filePath)}`,
    };

    await RNFS.downloadFile(options).promise.then(res => {
      !!successCallback && successCallback(options.toFile);
    }).catch(err => {
      console.log('=============download audio error', err);
      !!failsCallback && failsCallback();
    });
  }

  function getFileName(filePath) {
    let fileNames = filePath.split('/');

    return fileNames[fileNames.length - 1];
  }
})();

export default AudioDownloader;
