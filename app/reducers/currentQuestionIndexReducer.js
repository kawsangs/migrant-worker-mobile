const currentQuestionIndexReducer = (state=0, action) => {
  switch(action.type) {
    case 'SET_CURRENT_INDEX':
      return action.payload
    default:
      return state;
  }
}

export default currentQuestionIndexReducer;
