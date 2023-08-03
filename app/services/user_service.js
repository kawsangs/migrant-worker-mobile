import NetInfo from "@react-native-community/netinfo";
import webService from './web_service';
import RNFetchBlob from 'rn-fetch-blob'
import Sidekiq from '../models/Sidekiq';
import User from '../models/User';

export default class UserService  {
  static async upload(uuid) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) { return; }
      let user = User.find(uuid);

      if(!user) return;

      webService.post('users', this._buildData(user))
        .then(res => Sidekiq.destroy(uuid))
    });
  }

  static _buildData(user) {
    let attributes = {
      uuid: user.uuid,
      full_name: user.name,
      age: user.age,
      sex: user.sex,
      audio: user.voiceRecord,
      registered_at: user.created_at
    }

    let data = [{ name : 'user', data : JSON.stringify(attributes)}];

    if (!!user.voiceRecord) {
      data.push({
        name: 'audio',
        filename : 'voiceRecord.aac',
        type:'audio/aac',
        data: RNFetchBlob.wrap('file://'+ user.voiceRecord)
      })
    }

    return data;
  }
}
