import Departure from '../models/Departure';
import { Api } from '../utils/api';
import{ titleCase } from '../utils/string';

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

    // downloadImage or downloadAudio
    let downloadFunction = "download" + titleCase(category.type);

    // Download image or audio
    Departure[downloadFunction](category, function(fileUrl) {
      Departure.update(category.uuid, buildParam(category, fileUrl));

      increaseProgressCallback();

      // Download next pending asset recursively
      download(index + 1, categories, increaseProgressCallback);
    });
  }

  function buildParam(category, fileUrl) {
    let params = {}
    params[category.type] = fileUrl;

    return params;
  }
})();

export default CategoryService;
