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
import Images from '../utils/images';

export default class About extends React.Component {
  state = {};

  _renderLogo(name, url, option={}) {
    return (
      <TouchableOpacity
        style={{margin: 10}}
        onPress={() => Linking.openURL(url)}>
        <Image source={Images[name]} style={{width: option.w, height: option.h}} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={[Style.container, {alignItems: 'center'}]}>
          <View style={Style.card}>
            <Image source={Images.logo} style={{width: 90, height: 90}}/>
          </View>

          <Text style={{fontFamily: FontFamily.title, marginBottom: 30}}>កម្មវិធីចំណាកស្រុកឆ្លាតវៃ</Text>

          <Text style={{textAlign: 'justify'}}>
            កម្មវិធីចំណាកស្រុកឆ្លាតវៃជាកម្មវិធីទូរស័ព្ទបង្កើតឡើងក្នុងគោលបំណងជំនួយទៅដល់ជនដែលមានបំណងចំណាកស្រុក រឺកំពុងចំណាកស្រុកធ្វើការនៅប្រទេសទីបី និងក្រុមស្ត្រីងាយរងគ្រោះក្នុងការស្វែងរកព័ត៌មាន និងជំនួយនៅពេលចាំបាច់។ កម្មវិធីនេះក៏បានបង្កើតឡើងក្នុងគោលបំណងអោយជនដែលមានបំណងចំណាកស្រុកបានសិក្សាជាមុនពីព័ត៌មានដែលពួកគាត់ត្រូវត្រៀមខ្លួន និងស្វែងយល់មុនពេល និងកំឡុងពេលចំណាកស្រុកបំរើរការងារនៅក្រៅប្រទេស។
          </Text>

          <Text style={{fontFamily: FontFamily.title, marginTop: 14}}>សហការផលិតដោយ</Text>

          { this._renderLogo('instedd_logo', 'http://ilabsoutheastasia.org', {w: 234, h: 70}) }
          { this._renderLogo('chc_logo', 'http://ilabsoutheastasia.org', {w: 212, h: 70}) }
          { this._renderLogo('unwomen', 'http://ilabsoutheastasia.org', {w: 194, h: 55}) }

          <Text style={{fontFamily: FontFamily.title, marginTop: 14}}>ក្រោមថវិការដោយ</Text>

          { this._renderLogo('spotlight', 'http://ilabsoutheastasia.org', {w: 203, h: 110}) }
        </View>
      </ScrollView>
    );
  }
}
