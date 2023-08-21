import Form from '../models/Form';
import FileDownloader from '../downloaders/file_downloader';
import realm from '../db/schema';
import formList from '../db/json/form_stories';
import WebService from './web_service';
import endpointHelper from '../helpers/endpoint_helper';

class FormService extends WebService {
  constructor() {
    super();
    _this = this;
  }

  updateForm(callback) {
    this.get(endpointHelper.listingEndpoint('forms'))
      .then(res => JSON.parse(res.data))
      .then(data => {
        let newForms = data.filter(form => !formList.filter(x => x.id == form.id).length)
        Form.upsertCollection(newForms);

        let items = Form.getPendingDownload();
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

export default FormService;
