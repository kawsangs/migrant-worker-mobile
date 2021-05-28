import QuizService from '../services/quiz_service';
import queueFactory from 'react-native-queue';

export default class QuizWorker {
  static async init() {
    const queue = await queueFactory();
    queue.addWorker('uploadQuiz', async (id, payload) => {
      QuizService.upload(payload.uuid);
    });
  }

  static async performAsync(uuid) {
    const queue = await queueFactory();
    queue.createJob('uploadQuiz', { uuid: uuid }, {}, true);
  }
}

