import React, {Component} from 'react';
// import NetInfo from "@react-native-community/netinfo";
import realm from '../schemas/schema';
import api from '../utils/api';
import { environment } from '../config/environment';

export default class UploadServices  {
  static async uploadUser(uuid) {
    // alert('upload')
    // NetInfo.isConnected.fetch().then(isConnected => {
    //   api.post('/migrants', this._buildData(uuid)).then((res) => {
    //     if(res.data && res.data.success){
    //       this.cursor = 0;
    //       this.data = realm.objects('Sidekiq').slice();
    //       this.uploadSidekiq();
    //     }
    //   })
    // });
    // alert('me');
    // api.post('/migrants', this._buildData(uuid)).then((res) => {
    // let data = this._buildData(uuid);
    // alert(JSON.stringify(data))

    // let user = realm.objects('User')[0];
    // var body = new FormData();
    // body.append('full_name', user.name);
    // body.append('age', user.age);

    // body.append('voice', {});
    // if (!user.voiceRecord) {
    //   body.append('voice', {
    //     name: 'test.aac',
    //     type: 'audio/aac',
    //     uri: 'file://' + user.voiceRecord
    //   });
    // }


    // try {
    //   // const res = await fetch("https://8ab20335.ngrok.io/api/v1/migrants", {
    //   const res = await fetch("http://192.168.0.109:3000/api/v1/migrants", {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization': `Bearer ${environment.access_token}`
    //     },
    //     body: body,
    //   })
    //   const json = await res.json();
    // } catch (err) {
    //   alert(err)
    // }


    // fetch(`${environment.apiUrl}/migrants`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: body
    // })
    // .then(response => response.json())
    // .then(response => {
    //   console.log("upload succes", response);
    //   alert("Upload success!");
    //   this.setState({ photo: null });
    // })
    // .catch(error => {
    //   console.log("upload error", error);
    //   alert("Upload failed!");
    // });
  }

  static _buildData(uuid) {
    // let user = realm.objects('User').filtered('uuid="' + uuid + '"')[0];
    let user = realm.objects('User')[0];

    if (!user) {
      return {};
    }

    let attributes = {
      uuid: user.uuid,
      full_name: user.name,
      age: user.age,
      sex: user.sex,
      phone_number: user.phoneNumber,
      voice: user.voiceRecord
    }

    let formData = new FormData();
    formData.append('migrant', JSON.stringify(attributes));

    if (!!user.voiceRecord) {
      formData.append('voice', {
        uri: 'file://'+ user.voiceRecord,
        type: 'audio/aac',
        name: 'voiceRecord.aac'
      });
    }

    return formData;
  }
}
