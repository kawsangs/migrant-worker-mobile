import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from '../utils/api';

const TOKEN_KEY = 'registeredToken';

const RegisteredTokenService = (() => {
  return {
    handleSyncingToken: handleSyncingToken
  }

  function handleSyncingToken() {
    messaging()
      .getToken()
      .then(token => {
        console.log('== firebase token == ', token)
        return handleToken(token);
      });

    // // Listen to whether the token changes
    // return messaging().onTokenRefresh(token => {
    //   handleToken(token);
    // });
  }

  function handleToken(token) {
    AsyncStorage.getItem(TOKEN_KEY, (error, storageToken) => {
      if(!storageToken) {
        return sendToken(token);
      }

      let jsonValue = JSON.parse(storageToken) || {};

      if(jsonValue.token == token) { return }

      sendToken(token, jsonValue.id);
    })
  }

  async function sendToken(token, id) {
    let data =  { registered_token: {token: token, id: id} };
    Api.put(`/registered_tokens`, data)
      .then(res => {
        if(res.ok == true) {
          saveToken(res.data);
        }
      });
  }

  async function saveToken(value) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(value));
    } catch (e) {
    }
  }
})();

export default RegisteredTokenService;
