import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import listData from '../data/json/service_directories';
import uuidv4 from '../utils/uuidv4';
import { InjectArray } from '../utils/math';

export default class ServiceDirectory extends React.Component {
  state = {};

  _onPress(phoneNumber) {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  _renderPhoneList(phones) {
    let doms = phones.map ( (phone, index) => (
      <TouchableOpacity
        onPress={() => this._onPress(phone)}
        style={{flexDirection: 'row', paddingBottom: 10, paddingTop: 10, borderBottomWidth: 1, borderColor: Color.border}} key={index}>
        <Icon name='phone' size={24} color={'#111'} />
        <Text style={{marginLeft: 10}}>{phone}</Text>
      </TouchableOpacity>
    ))

    return (doms);
  }

  _renderCard(contact) {
    return (
      <View
        key={uuidv4()}
        style={Style.card}
        >
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, mraginRight: 16, justifyContent: 'center'}}>
            <Text style={{fontFamily: FontFamily.title}}>{contact.name}</Text>
            { this._renderPhoneList(contact.phones) }

          </View>

          <PlaySound
            style={{paddingLeft: 10}}
            fileName={contact.fileName || 'register'}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({activePlaying: fileName})}/>
        </View>


      </View>
    );
  }

  _renderCambodia() {
    let cambodia = listData.filter(l => l.country == 'Cambodia')[0];

    return (
      <View>
        <Text style={{fontSize: FontSize.title, fontFamily: FontFamily.title}}>កម្ពុជា</Text>
        <Text style={{marginBottom: 16}}>លេខទូរស័ព្ទជួយសង្គ្រោះបន្ទាន់នៅក្នុងប្រទេសកម្ពុជា៖</Text>
        { this._renderList(cambodia) }
      </View>
    );
  }

  _renderList(country) {
    return country.list.map((list) => this._renderCard(list));
  }

  _renderOtherCounties() {
    let countries = listData.filter(l => l.country != 'Cambodia');
    let doms = [];

    for(let i=0; i<countries.length; i++) {
      doms.push(<Text key={i} style={{fontFamily: FontFamily.title, fontSize: FontSize.title, marginBottom: 8, marginTop: 8}}>ប្រទេស{countries[i].country}</Text>);
      doms.push(this._renderList(countries[i]));
    }

    return (
      <View>
        <Text style={{marginTop: 16, marginBottom: 8}}>ប្រសិនអ្នកនៅក្រៅប្រទេសកម្ពុជា អ្នកអាចស្វែងរកជំនួយពីស្ថានទូតរបស់អ្នកតាមលេខទូរស័ព្ទខាងក្រោម៖</Text>
        {doms}
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          { this._renderCambodia() }
          { this._renderOtherCounties() }
        </View>
      </ScrollView>
    );
  }
}
