import { combineReducers } from 'redux';

import downloadProgressReducer from './downloadProgressReducer';
import questionReducer from './questionReducer';
import currentQuestionIndexReducer from './currentQuestionIndexReducer';
import currentQuizReducer from './currentQuizReducer';
import currentUserReducer from './currentUserReducer';

const allReducers = combineReducers({
  downloadProgress: downloadProgressReducer,
  questions: questionReducer,
  currentQuestionIndex: currentQuestionIndexReducer,
  currentQuiz: currentQuizReducer,
  currentUser: currentUserReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
