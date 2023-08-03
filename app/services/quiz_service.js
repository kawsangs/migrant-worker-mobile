import NetInfo from "@react-native-community/netinfo";
import Sidekiq from '../models/Sidekiq';
import Quiz from '../models/Quiz';
import Answer from '../models/Answer';
import webService from './web_service';

export default class QuizService  {
  static async upload(uuid) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) return;

      let quiz = Quiz.find(uuid);
      let answers = Answer.byQuiz(uuid);

      if(!quiz || !!quiz.uploaded_id || !answers.length) return;

      webService.post('quizzes', JSON.stringify(this._buildParams(quiz, answers)), 'application/json')
        .then(response => JSON.parse(response.data))
        .then(data => {
          Answer.uploadVoiceAnsync(uuid);
          Sidekiq.destroy(uuid);
          Quiz.upsert({uuid: uuid, uploaded_id: data.id});
        })
    });
  }

  static _buildParams(quiz, answers) {
    let answers_attributes = answers.map(answer => {
      return {
        uuid: answer.uuid,
        question_id: answer.question_id,
        question_code: answer.question_code,
        value: answer.value,
        score: answer.score,
        user_uuid: answer.user_uuid,
        quiz_uuid: answer.quiz_uuid
      }
    })

    return {
      id: quiz.uploaded_id,
      uuid: quiz.uuid,
      user_uuid: quiz.user_uuid,
      form_id: quiz.form_id,
      quizzed_at: quiz.quizzed_at,
      answers_attributes: answers_attributes
    }
  }
}
