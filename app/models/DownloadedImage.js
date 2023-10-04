
import RNFS from 'react-native-fs';
import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import fileUtil from '../utils/file_util';

const MODEL = 'DownloadedImage';

const DownloadedImage = (() => {
  return {
    create,
    findByName,
    isFileNameExisted,
    getImagePath,
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, {...data, uuid: uuidv4()})
    })
  }

  function findByName(name) {
    return realm.objects(MODEL).filtered(`name = '${name}'`)[0]
  }

  function isFileNameExisted(fileUrl) {
    return !!findByName(fileUtil.getFilenameFromUrl(fileUrl))
  }

  function getImagePath(fileUrl) {
    if (!fileUrl) return null;

    const downloadedImage = findByName(fileUtil.getFilenameFromUrl(fileUrl))
    return !!downloadedImage ? `file://${RNFS.DocumentDirectoryPath}/${downloadedImage.name}` : null
  }
})();

export default DownloadedImage;