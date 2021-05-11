import Form from '../models/Form';
import { Api } from '../utils/api';
import AudioDownloader from '../downloaders/audio_downloader';
import realm from '../db/schema';

const CategoryService = (()=> {
  return {
    downloadForm,
  }

  function downloadForm(updateTotalCountCallback, increaseProgressCallback) {
    Api.get('/forms')
      .then(response => response.data)
      .then(data => {
        // Upsert to db
        Form.upsertCollection(data);

        // Find in db where pending for download
        let items = Form.getPendingDownload();

        // Update progress state
        console.log("items=============", items.length);
        updateTotalCountCallback(items.length + 1);
        increaseProgressCallback();

        // Call to download first pending
        download(0, items, increaseProgressCallback);
      })
  }

  // Private

  function download(index, items, increaseProgressCallback) {
    if(index == items.length) { return; }

    let item = items[index];
    AudioDownloader.download(_getFileName(item), item.url, function(fileUrl) {
      realm.write(() => {
        item.obj[item.type] = fileUrl
      });

      increaseProgressCallback();
      download(index + 1, items, increaseProgressCallback);
    })
  }

  function _getFileName(item={}) {
    let fileNames = item.url.split('/');
    return `${item.type}_${item.uuid}_${fileNames[fileNames.length - 1]}`;
  }
})();

export default CategoryService;
