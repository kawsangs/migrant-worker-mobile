import UploadServices from '../services/upload_service';
import queueFactory from 'react-native-queue';

export default class UserWorker {
  static async init() {
    queue = await queueFactory();
    queue.addWorker('uploadUser', async (id, payload) => {
      UploadServices.uploadUser(payload.uuid);
    });
  }

  static async performAsync(uuid) {
    queue = await queueFactory();
    queue.createJob('uploadUser', { uuid: uuid }, {}, true);
  }
}
