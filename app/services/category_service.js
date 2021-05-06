import Departure from '../models/Departure';
import { Api } from '../utils/api';
import{ titleCase } from '../utils/string';
import ImageDownloader from '../downloaders/image_downloader';
import AudioDownloader from '../downloaders/audio_downloader';
import realm from '../db/schema';

const CategoryService = (()=> {
  return {
    downloadDeparture,
  }

  function downloadDeparture(updateTotalCountCallback, increaseProgressCallback) {
    Api.get('/departures')
      .then(response => response.data)
      .then(data => {
        // Upsert to db
        Departure.upsertCollection(data);

        // Find in db where pending for download
        let categories = Departure.getPendingDownload();

        // Update progress state
        updateTotalCountCallback(categories.length + 1);
        increaseProgressCallback();

        // Call to download first pending
        download(0, categories, increaseProgressCallback);
      })
  }

  function download(index, categories, increaseProgressCallback) {
    if(index == categories.length) { return; }

    let category = categories[index];
    let downloader = category.type == 'image' ? ImageDownloader : AudioDownloader;

    downloader.download(_getFileName(category), category.url, function(fileUrl) {
      realm.write(() => {
        category.obj[category.type] = fileUrl
      });

      increaseProgressCallback();
      download(index + 1, categories, increaseProgressCallback);
    })
  }

  function _getFileName(category={}) {
    let fileNames = category.url.split('/');
    return `${category.type}_${category.uuid}_${fileNames[fileNames.length - 1]}`;
  }
})();

export default CategoryService;
