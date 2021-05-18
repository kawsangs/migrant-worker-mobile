import AsyncStorage from '@react-native-async-storage/async-storage';
const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('CURRENT_USER', JSON.stringify(user))
  } catch (e) {
    // saving error
  }
}

const currentUserReducer = (state={}, action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      storeUser(action.payload)
      return action.payload
    default:
      return state;
  }
}

export default currentUserReducer;
