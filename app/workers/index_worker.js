import UserWorker from './user_worker';
import QuizWorker from './quiz_worker';
import AnswerWorker from './answer_worker';
import VisitWorker from './visit_worker';
import Sidekiq from '../models/Sidekiq';
import queue from 'react-native-job-queue'

const IndexWorker = (() => {
  return {
    init
  }

  async function init() {
    queue.configure({onQueueFinish:(executedJobs)=>{
      console.log("Queue stopped and executed")
    }});

    UserWorker.init();
    QuizWorker.init();
    AnswerWorker.init();
    VisitWorker.init();
  }
})();

export default IndexWorker;
