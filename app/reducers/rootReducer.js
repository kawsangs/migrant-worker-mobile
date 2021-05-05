import { combineReducers } from 'redux';

import downloadProgressReducer from './downloadProgressReducer';

const allReducers = combineReducers({
  downloadProgress: downloadProgressReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
