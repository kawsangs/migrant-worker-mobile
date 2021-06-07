import { environment } from '../config/environment';
import RNFS from 'react-native-fs';

const FileDownloader = (()=> {
  return {
    download: download,
    isFileExist: isFileExist,
  }

  async function download(fileName, filePath, successCallback, failsCallback) {
    let domain = environment.state == 'development' ? environment.domain : "";
    let options = {
      fromUrl: `${domain}/${filePath}`,
      toFile: `${RNFS.DocumentDirectoryPath}/${fileName}`,
    };

    const isFileExist = await RNFS.exists(options.toFile);

    if (isFileExist) {
      !!successCallback && successCallback(options.toFile);
      return;
    }

    await RNFS.downloadFile(options).promise.then(res => {
      !!successCallback && successCallback(options.toFile);
    }).catch(err => {
      console.log('=============download audio error', err);
      !!failsCallback && failsCallback();
    });
  }

  async function isFileExist(fileName) {
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const isFileExist = await RNFS.exists(filePath);
    return isFileExist;
  }
})();

export default FileDownloader;
