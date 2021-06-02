import UserService from '../services/user_service';
import queue from 'react-native-job-queue';
import { Worker } from 'react-native-job-queue';

export default class UserWorker {
  static init() {
    queue.addWorker(new Worker("uploadUser", (payload) => {
      UserService.upload(payload.uuid);
    }));
  }

  static performAsync(uuid) {
    queue.addJob("uploadUser", { uuid: uuid }, {}, true);
  }
}
