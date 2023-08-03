import Form from '../models/Form';
import FileDownloader from '../downloaders/file_downloader';
import realm from '../db/schema';
import formList from '../db/json/form_stories';
import webService from './web_service';

const FormService = (()=> {
  return {
    updateForm,
  }

  function updateForm(callback) {
    webService.get('/forms')
      .then(res => JSON.parse(res.data))
      .then(data => {
        let newForms = data.filter(form => !formList.filter(x => x.id == form.id).length)
        Form.upsertCollection(newForms);

        let items = Form.getPendingDownload();
        download(0, items, callback);
      })
  }

  // Private
  function download(index, items, callback) {
    if(index == items.length) {
      !!callback && callback();
      return;
    }

    let item = items[index];

    FileDownloader.download(_getFileName(item), item.url, function(fileUrl) {
      realm.write(() => {
        item.obj[item.type] = fileUrl
      });

      download(index + 1, items, callback);
    })
  }

  function _getFileName(item={}) {
    let fileNames = item.url.split('/');
    return `${item.type}_${item.uuid}_${fileNames[fileNames.length - 1]}`;
  }
})();

export default FormService;
