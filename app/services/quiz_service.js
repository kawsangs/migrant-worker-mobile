import React, {Component} from 'react';
import NetInfo from "@react-native-community/netinfo";
import { ApiBlob, Api } from '../utils/api';
import RNFetchBlob from 'rn-fetch-blob'
import Sidekiq from '../models/Sidekiq';
import Quiz from '../models/Quiz';
import Answer from '../models/Answer';

export default class QuizService  {
  static async upload(uuid) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) return;

      let quiz = Quiz.find(uuid);
      let answers = Answer.byQuiz(uuid);

      if(!quiz || !answers.length) return;

      Api.post('/quizzes', this._buildParams(quiz, answers))
        .then(response => response.data)
        .then(data => {
          Answer.uploadVoiceAnsync(uuid);
          Sidekiq.destroy(uuid);
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
      uuid: quiz.uuid,
      user_uuid: quiz.user_uuid,
      form_id: quiz.form_id,
      quizzed_at: quiz.quizzed_at,
      answers_attributes: answers_attributes
    }
  }
}
