import Option from '../models/Option';
import FileDownloader from '../downloaders/file_downloader';

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

    let item = items[index];

    FileDownloader.download(item.url, (fileUrl) => {
      // realm.write(() => {
      //   item.obj[item.type] = fileUrl
      // });

      _download(index + 1, items);
    })
  }
})();

export default optionService;