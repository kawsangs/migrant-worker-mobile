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
import Images from '../utils/images';
import { addStatistic } from '../utils/statistic';
import CollapsibleNavbar from '../components/collapsible_navbar';

export default class Contact1280 extends React.Component {
  state = {};

  _onPress(item) {
    addStatistic(`contact1280_via_${item.iconName}`);

    Linking.canOpenURL(item.url).then(supported => {
      if (supported) {
        Linking.openURL(item.url);
      } else {
        alert(`សូមដំឡើងកម្មវិធី ${item.iconName}!`);
      }
    });
  }

  _renderCard(item, index) {
    return (
      <TouchableOpacity
        key={index}
        style={Style.card}
        onPress={() => this._onPress(item)}
        >
        <View style={Style.cardContent}>
          <View style={Style.avata}>
            <Image source={Images[item.iconName]} style={{width: 72, height: 72}} />
          </View>

          <View style={{flex: 1, marginLeft: 16, mraginRight: 16, justifyContent: 'center'}}>
            <Text>{item.title}</Text>
          </View>

          <PlaySound
            style={{paddingLeft: 10}}
            fileName={item.audioFileName || 'register'}
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

  _renderCardList() {
    let list = [
      { title: 'ភ្ជាប់ទៅ១២៨០ តាមរយៈហ្វេសប៊ុក', iconName: 'facebook', audioFileName: '', url: 'https://www.messenger.com/t/184586518283135' },
      { title: 'ភ្ជាប់ទៅ១២៨០ តាមរយៈ Whatsapp', iconName: 'whatsapp', audioFileName: '', url: 'whatsapp://send?phone=+85517866681&text=' },
      { title: 'ភ្ជាប់ទៅ១២៨០ តាមរយៈ Telegram', iconName: 'telegram', audioFileName: '', url: 'tg://resolve?domain=limborey' },
    ]

    return list.map((item, index) => this._renderCard(item, index))
  }

  render() {
    return(
      <CollapsibleNavbar
        options={{
          title: 'ទាក់ទងទៅលេខ១២៨០',
          bodyContent: this._renderCardList(),
        }}
      />
    )
  }
}
