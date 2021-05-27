import AnswerService from '../services/answer_service';
import queueFactory from 'react-native-queue';

export default class AnswerWorker {
  static async init() {
    const queue = await queueFactory();
    queue.addWorker('uploadAnswer', async (id, payload) => {
      AnswerService.upload(payload.uuid);
    });
  }

  static async performAsync(uuid) {
    const queue = await queueFactory();
    queue.createJob('uploadAnswer', { uuid: uuid }, {}, true);
  }
}

