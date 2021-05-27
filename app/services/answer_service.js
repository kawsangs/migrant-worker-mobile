import React, {Component} from 'react';
import NetInfo from "@react-native-community/netinfo";
import { ApiBlob } from '../utils/api';
import RNFetchBlob from 'rn-fetch-blob'
import Sidekiq from '../models/Sidekiq';
import Answer from '../models/Answer';

export default class AnswerService  {
  static async upload(uuid) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) { return; }

      let answer = Answer.find(uuid);

      if(!answer || !answer.voice) return;

      ApiBlob.put(`/answers/${uuid}`, this._buildParam(answer)).then((resp) => {
        Sidekiq.destroy(uuid);
      })
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
