import UserService from '../services/user_service';
import queue from 'react-native-job-queue';
import { Worker } from 'react-native-job-queue';

export default class UserWorker {
  static init() {
    if (!!queue.registeredWorkers["uploadUser"]) {
      return;
    }

    queue.addWorker(new Worker("uploadUser", (payload) => {
      new UserService().upload(payload.uuid);
    }));
  }

  static performAsync(uuid) {
    queue.addJob("uploadUser", { uuid: uuid }, {}, true);
  }
}
