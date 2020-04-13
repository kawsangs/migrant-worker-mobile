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

export default class Chc extends React.Component {
  state = {};

  _onPress(url) {
    // let whatsappNo = '';
    // let whatsappMsg = 'test';
    // Linking.openURL(`whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}`);
    alert('press me')
  }

  _renderCard(title, image, fileName) {
    return (
      <TouchableOpacity
        style={Style.card}
        onPress={() => this._onPress()}
        >
        <View style={Style.cardContent}>
          <View style={Style.avata}>
            <Image source={Images[image]} style={{width: 72, height: 72}} />
          </View>

          <View style={{flex: 1, marginLeft: 16, mraginRight: 16, justifyContent: 'center'}}>
            <Text>{title}</Text>
          </View>

          <PlaySound
            style={{paddingLeft: 10}}
            fileName={fileName}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({activePlaying: fileName})}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, fontFamily: FontFamily.title, color: Color.primary}}>ចូលភ្ជាប់</Text>
          <Icon name='keyboard-arrow-right' size={24} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          { this._renderCard('ភ្ជាប់ទៅ១២៨០ តាមរយៈហ្វេសប៊ុក', 'facebook', 'register') }
          { this._renderCard('ភ្ជាប់ទៅ១២៨០ តាមរយៈ Whatsapp', 'whatsapp', 'register') }
          { this._renderCard('ភ្ជាប់ទៅ១២៨០ តាមរយៈ Telegram', 'telegram', 'register') }
        </View>
      </ScrollView>
    );
  }
}
