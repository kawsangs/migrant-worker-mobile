import QuizService from '../services/quiz_service';
import queue from 'react-native-job-queue';
import { Worker } from 'react-native-job-queue';

export default class QuizWorker {
  static init() {
    queue.addWorker(new Worker('uploadQuiz', (payload) => {
      QuizService.upload(payload.uuid);
    }));
  }

  static performAsync(uuid) {
    queue.addJob('uploadQuiz', { uuid: uuid }, {}, true);
  }
}

