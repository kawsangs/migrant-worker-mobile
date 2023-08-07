import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from 'rn-fetch-blob'
import Sidekiq from '../models/Sidekiq';
import Answer from '../models/Answer';
import webService from './web_service';

export default class AnswerService  {
  static async upload(uuid) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) { return; }

      let answer = Answer.find(uuid);

      if(!answer || !answer.voice) return;

      webService.put(`answers/${uuid}`, this._buildParam(answer))
        .then(res => Sidekiq.destroy(uuid))
    });
  }

  static _buildParam(answer) {
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
