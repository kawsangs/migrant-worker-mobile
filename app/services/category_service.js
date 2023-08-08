import Departure from '../models/Departure';
import Safety from '../models/Safety';
import FileDownloader from '../downloaders/file_downloader';
import realm from '../db/schema';
import categoryList from '../db/json/categories';
import webService from './web_service';

const departureList = categoryList.filter(cat => cat.type == "Categories::Departure");
const safetyList = categoryList.filter(cat => cat.type == "Categories::Safety");

const CategoryService = (()=> {
  return {
    updateDepartures,
    updateSafeties,
  }

  function updateDepartures(callback) {
    webService.get('/departures')
      .then(res => JSON.parse(res.data))
      .then(data => {
        let newCategories = data.filter(cat => !departureList.filter(x => x.id == cat.id).length)
        Departure.upsertCollection(newCategories);
        let items = Departure.getPendingDownload();
        download(0, items, callback);
      })
  }

  function updateSafeties(callback) {
    webService.get('/safeties')
      .then(res => JSON.parse(res.data))
      .then(data => {
        let newCategories = data.filter(cat => !safetyList.filter(x => x.id == cat.id).length)
        Safety.upsertCollection(newCategories);
        let items = Safety.getPendingDownload();
        download(0, items, callback);
      })
  }

  function download(index, items, callback) {
    if(index == items.length) {
      !!callback && callback();
      return;
    }

    let item = items[index];

    FileDownloader.download(item.url, function(fileUrl) {
      realm.write(() => {
        item.obj[item.type] = fileUrl
      });

      download(index + 1, items, callback);
    })
  }
})();

export default CategoryService;
