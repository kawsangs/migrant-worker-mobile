const currentPlayingAudioReducer = (state={}, action) => {
  switch(action.type) {
    case 'SET_CURRENT_PLAYING_AUDIO':
      return action.payload
    default:
      return state;
  }
}

export default currentPlayingAudioReducer;
