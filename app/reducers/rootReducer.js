import { combineReducers } from 'redux';

import downloadProgressReducer from './downloadProgressReducer';
import questionReducer from './questionReducer';
import currentQuestionIndexReducer from './currentQuestionIndexReducer';
import currentQuizReducer from './currentQuizReducer';
import currentUserReducer from './currentUserReducer';
import notificationReducer from './notificationReducer';
import currentPlayingAudioReducer from './currentPlayingAudioReducer';

const allReducers = combineReducers({
  downloadProgress: downloadProgressReducer,
  questions: questionReducer,
  currentQuestionIndex: currentQuestionIndexReducer,
  currentQuiz: currentQuizReducer,
  currentUser: currentUserReducer,
  notifications: notificationReducer,
  currentPlayingAudio: currentPlayingAudioReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
