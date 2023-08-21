import Departure from '../models/Departure';
import Safety from '../models/Safety';
import FileDownloader from '../downloaders/file_downloader';
import realm from '../db/schema';
import categoryList from '../db/json/categories';
import WebService from './web_service';
import endpointHelper from '../helpers/endpoint_helper';

const departureList = categoryList.filter(cat => cat.type == "Categories::Departure");
const safetyList = categoryList.filter(cat => cat.type == "Categories::Safety");

class CategoryService extends WebService {
  constructor() {
    super();
    _this = this;
  }

  syncDepartures(callback) {
    this.get(endpointHelper.listingEndpoint('departures'))
      .then(res => JSON.parse(res.data))
      .then(data => {
        let newCategories = data.filter(cat => !departureList.filter(x => x.id == cat.id).length)
        Departure.upsertCollection(newCategories);
        let items = Departure.getPendingDownload();
        this._download(0, items, callback);
      })
  }

  syncSafeties(callback) {
    this.get(endpointHelper.listingEndpoint('safeties'))
      .then(res => JSON.parse(res.data))
      .then(data => {
        let newCategories = data.filter(cat => !safetyList.filter(x => x.id == cat.id).length)
        Safety.upsertCollection(newCategories);
        let items = Safety.getPendingDownload();
        this._download(0, items, callback);
      })
  }

  // private method
  _download(index, items, callback) {
    if(index == items.length) {
      !!callback && callback();
      return;
    }

    let item = items[index];

    FileDownloader.download(item.url, function(fileUrl) {
      realm.write(() => {
        item.obj[item.type] = fileUrl
      });

      _this._download(index + 1, items, callback);
    })
  }
}

export default CategoryService;
