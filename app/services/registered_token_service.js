import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import webService from '../services/web_service';

const TOKEN_KEY = 'registeredToken';

const RegisteredTokenService = (() => {
  return {
    handleSyncingToken: handleSyncingToken
  }

  function handleSyncingToken() {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        messaging()
          .getToken()
          .then(token => {
            return handleToken(token);
          });
      }
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
    webService.put('registered_tokens', JSON.stringify(data), 'application/json')
      .then(res => {
        if(res.respInfo.status == 200) {
          saveToken(JSON.parse(res.data));
        }
      })
  }

  async function saveToken(value) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(value));
    } catch (e) {
    }
  }
})();

export default RegisteredTokenService;
