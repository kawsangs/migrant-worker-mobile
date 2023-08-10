import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import WebService from '../services/web_service';
import endpointHelper from '../helpers/endpoint_helper';

const TOKEN_KEY = 'registeredToken';

class RegisteredTokenService extends WebService {
  handleSyncingToken() {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        messaging()
          .getToken()
          .then(token => {
            return this._handleToken(token);
          });
      }
    });
  }

  // private method
  _handleToken(token) {
    AsyncStorage.getItem(TOKEN_KEY, (error, storageToken) => {
      if(!storageToken) {
        return this._sendToken(token);
      }

      let jsonValue = JSON.parse(storageToken) || {};

      if(jsonValue.token == token) { return }

      this._sendToken(token, jsonValue.id);
    })
  }

  async _sendToken(token, id) {
    let data =  { registered_token: {token: token, id: id} };
    this.put(endpointHelper.listingEndpoint('registered_tokens'), JSON.stringify(data), 'application/json')
      .then(res => {
        if(res.respInfo.status == 200) {
          this._saveToken(JSON.parse(res.data));
        }
      })
  }

  async _saveToken(value) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(value));
    } catch (e) {
    }
  }
}

export default RegisteredTokenService;