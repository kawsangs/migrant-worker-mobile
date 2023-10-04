import Option from '../models/Option';
import DownloadedImage from '../models/DownloadedImage';
import FileDownloader from '../downloaders/file_downloader';
import fileUtil from '../utils/file_util';

const optionService = (() => {
  return {
    saveOptions
  }

  function saveOptions(options, questionCode) {
    Option.upsertCollection(options, questionCode);
    _download(0, options);
  }

  // private method
  function _download(index, items) {
    if(index == items.length)
      return;

    const item = items[index];
    if (!!item.icon && !DownloadedImage.isFileNameExisted(item.icon)) {
      FileDownloader.download(item.icon, (fileUrl) => {
        DownloadedImage.create({name: fileUtil.getFilenameFromUrl(item.icon)})
        _download(index + 1, items)
      }, () => _download(index + 1, items))
    }
    else
      _download(index + 1, items)
  }
})();

export default optionService;