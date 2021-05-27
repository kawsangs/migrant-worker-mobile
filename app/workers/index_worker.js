import UserWorker from './user_worker';
import QuizWorker from './quiz_worker';
import AnswerWorker from './answer_worker';
import Sidekiq from '../models/Sidekiq';

const IndexWorker = (() => {
  return {
    init
  }

  async function init() {
    UserWorker.init();
    QuizWorker.init();
    AnswerWorker.init();
  }
})();

export default IndexWorker;
