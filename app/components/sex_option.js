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
import { InjectArray } from '../utils/math';

export default class SexOption extends React.Component {
  _buildOption(item, index) {
    let borderStyle = this.props.sex == item.value ? { borderColor: Color.primary } : {};
    let textFont = this.props.sex == item.value ? FontFamily.title : FontFamily.body;
    let textColor = this.props.sex == item.value ? Color.primary : Color.textBlack;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.props.onPress(item.value) }
        style={[styles.card, Style.boxShadow, borderStyle]}>

        <Image source={Images[item.iconName]} style={{width: 52, height: 52}} />
        <Text style={{fontFamily: textFont, color: textColor}}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  _renderSexOption() {
    let list = [
      { title: 'ប្រុស', value: 'male', iconName: 'male' },
      { title: 'ស្រី', value: 'female', iconName: 'female' },
      { title: 'ផ្សេងៗ', value: 'other', iconName: 'other' },
    ];
    let space = <View style={{width: 24}} />;
    let doms = list.map((item, index) => this._buildOption(item, index))
    doms = InjectArray(doms, space);

    return (
      <View style={styles.cardWrapper}>
        { doms }
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
