// import realm from '../db/schema';

const downloadProgressReducer = (state=0.1, action) => {
  switch(action.type) {
    case 'SET_PROGRESS':
      return action.payload
    default:
      return state;
  }
}

export default downloadProgressReducer;
