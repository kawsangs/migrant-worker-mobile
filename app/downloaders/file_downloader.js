import RNFS from 'react-native-fs';
import fileUtil from '../utils/file_util';
import endpointHelper from '../helpers/endpoint_helper';

const FileDownloader = (()=> {
  return {
    download: download,
    isFileExist: isFileExist,
  }

  async function download(filePath, successCallback, failsCallback) {
    const filename = fileUtil.getFilenameFromUrl(filePath);

    let options = {
      fromUrl: endpointHelper.isUrlWithHostname(filePath) ? filePath : endpointHelper.getAbsoluteEndpoint(filePath),
      toFile: `${RNFS.DocumentDirectoryPath}/${filename}`,
    };

    const isFileExist = await RNFS.exists(options.toFile);

    if (isFileExist) {
      !!successCallback && successCallback(options.toFile);
      return;
    }

    await RNFS.downloadFile(options).promise.then(res => {
      !!successCallback && successCallback(options.toFile);
    }).catch(err => {
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
