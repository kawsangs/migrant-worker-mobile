import { combineReducers } from 'redux';

import downloadProgressReducer from './downloadProgressReducer';
import questionReducer from './questionReducer';
import currentQuestionIndexReducer from './currentQuestionIndexReducer';

const allReducers = combineReducers({
  downloadProgress: downloadProgressReducer,
  questions: questionReducer,
  currentQuestionIndex: currentQuestionIndexReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
