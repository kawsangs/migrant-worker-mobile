import AnswerService from '../services/answer_service';
import queue from 'react-native-job-queue';
import { Worker } from 'react-native-job-queue';

export default class AnswerWorker {
  static init() {
    if (!!queue.registeredWorkers["uploadAnswer"]) {
      return;
    }

    queue.addWorker(new Worker('uploadAnswer', (payload) => {
      AnswerService.upload(payload.uuid);
    }));
  }

  static performAsync(uuid) {
    queue.addJob('uploadAnswer', { uuid: uuid }, {}, true);
  }
}
