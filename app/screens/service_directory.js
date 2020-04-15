import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import listData from '../data/service_directories';
import uuidv4 from '../utils/uuidv4';

export default class ServiceDirectory extends React.Component {
  state = {};

  _onPress(contact) {
    this.props.navigation.navigate('ServiceDirectoryDetailScreen', {contact: contact})
  }

  _renderCard(contact) {
    return (
      <TouchableOpacity
        key={uuidv4()}
        style={Style.card}
        onPress={() => this._onPress(contact)}
        >
        <View style={Style.cardContent}>
          <View style={{flex: 1, mraginRight: 16, justifyContent: 'center'}}>
            <Text style={{fontFamily: FontFamily.title}}>{contact.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon name='phone' size={24} />
              <Text style={{marginLeft: 10}}>{contact.phone}</Text>
            </View>
          </View>

          <PlaySound
            style={{paddingLeft: 10}}
            fileName={contact.fileName || 'register'}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({activePlaying: fileName})}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, fontFamily: FontFamily.title, color: Color.primary}}>ចូលមើល</Text>
          <Icon name='keyboard-arrow-right' size={24} />
        </View>
      </TouchableOpacity>
    );
  }

  _renderCambodia() {
    let cambodia = listData.filter(l => l.country == 'Cambodia')[0];

    return (
      <View>
        <Text style={{marginBottom: 16}}>លេខទូរស័ព្ទជួយសង្គោះបន្ទាន់នៅក្នុងប្រទេសកម្ពុជា៖</Text>
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
      doms.push(<Text key={i} style={{fontFamily: FontFamily.title, marginBottom: 8, marginTop: 8}}>{i+1}) ប្រទេស{countries[i].country}</Text>);
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
