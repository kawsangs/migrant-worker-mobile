import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from 'rn-fetch-blob'
import Sidekiq from '../models/Sidekiq';
import Answer from '../models/Answer';
import WebService from './web_service';
import endpointHelper from '../helpers/endpoint_helper';

export default class AnswerService extends WebService {
  upload(uuid) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) { return; }

      let answer = Answer.find(uuid);

      if(!answer || !answer.voice) return;

      this.put(endpointHelper.detailEndpoint('answers', uuid), this._buildParam(answer))
        .then(res => Sidekiq.destroy(uuid))
    });
  }

  _buildParam(answer) {
    return [
      {
        name: 'voice',
        filename : 'voiceRecord.aac',
        type:'audio/aac',
        data: RNFetchBlob.wrap('file://'+ answer.voice)
      }
    ];
  }
}