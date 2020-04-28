import React, {Component} from 'react';
import NetInfo from "@react-native-community/netinfo";
import realm from '../schemas/schema';
import { ApiBlob } from '../utils/api';
import { environment } from '../config/environment';
import RNFetchBlob from 'rn-fetch-blob'

export default class UploadServices  {
  static async uploadUser(uuid) {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        ApiBlob.post('/migrants', this._buildData(uuid)).then((resp) => {
          // alert(JSON.stringify(resp))
        })
      } else {
        alert('no internet');
      }
    });
  }

  static _buildData(uuid) {
    let user = realm.objects('User').filtered('uuid="' + uuid + '"')[0];

    if (!user) {
      return [];
    }

    let attributes = {
      uuid: user.uuid,
      full_name: user.name,
      age: user.age,
      sex: user.sex,
      phone_number: user.phoneNumber,
      voice: user.voiceRecord
    }

    let data = [{ name : 'migrant', data : JSON.stringify(attributes)}];

    if (!!user.voiceRecord) {
      data.push({
        name: 'voice',
        filename : 'voiceRecord.aac',
        type:'audio/aac',
        data: RNFetchBlob.wrap('file://'+ user.voiceRecord)
      })
    }

    return data;
  }
}
