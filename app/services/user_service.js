import NetInfo from "@react-native-community/netinfo";
import WebService from './web_service';
import RNFetchBlob from 'rn-fetch-blob'
import Sidekiq from '../models/Sidekiq';
import User from '../models/User';
import endpointHelper from '../helpers/endpoint_helper';

export default class UserService extends WebService {
  upload(uuid) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) { return; }
      const user = User.find(uuid);

      if(!user) return;

      this.post(endpointHelper.listingEndpoint('users'), this._buildData(user))
        .then(res => {
          User.upsert({uuid: uuid, id: JSON.parse(res.data).id});
          Sidekiq.destroy(uuid)
        })
    });
  }

  _buildData(user) {
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