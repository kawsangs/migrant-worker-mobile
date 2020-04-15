import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';

export default class SexOption extends React.Component {
  _buildOption(title, value, imageName) {
    let borderStyle = this.props.sex == value ? { borderColor: Color.primary } : {};
    let textFont = this.props.sex == value ? FontFamily.title : FontFamily.body;
    let textColor = this.props.sex == value ? Color.primary : Color.textBlack;

    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(value) }
        style={[styles.card, borderStyle]}>

        <Image source={Images[imageName]} style={{width: 52, height: 52}} />
        <Text style={{fontFamily: textFont, color: textColor}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  _renderSexOption() {
    return (
      <View style={styles.cardWrapper}>
        { this._buildOption('ប្រុស', 'male', 'male') }
        <View style={{width: 24}}></View>
        { this._buildOption('ស្រី', 'female', 'female') }
        <View style={{width: 24}}></View>
        { this._buildOption('ផ្សេងៗ', 'other', 'other') }
      </View>
    )
  }

  render() {
    return (this._renderSexOption() );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    height: 110,
    borderRadius: 8,
  }
});
