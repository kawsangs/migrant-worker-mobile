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
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';

export default class Checklist extends React.Component {
  state = {};

  _renderList() {
    let list = [
      'កាតពលករកម្ពុជាធ្វើការក្រៅប្រទេស',
      'លិខិតឆ្លងដែន',
      'ទិដ្ឋាការការងារ',
      'កិច្ចសន្យារការងារ',
      'កិច្ចសន្យាររកការងារឱ្យធ្វើ',
      'លិខិតអនុញ្ញាតឱ្យស្នាក់នៅក្នុងប្រទេសទទួល',
      'ឯកសារផ្សេងៗ'
    ];

    return list.map(value => (
      <View key={uuidv4()} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
        <Icon name='radio-button-checked' size={24}/>
        <Text style={{marginLeft: 10}}>{value}</Text>
      </View>
    ));
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          <View style={Style.card}>
            <Text style={{fontFamily: FontFamily.title, marginBottom: 10}}>ឯកសារដែលអ្នកត្រូវមានដូចជា៖</Text>

            <View>
              { this._renderList() }
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
