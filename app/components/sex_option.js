import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';
import { InjectArray } from '../utils/math';

export default class SexOption extends React.Component {
  _buildOption(item, index) {
    let borderStyle = this.props.sex == item.value ? { borderColor: Color.primary } : {};
    let backgroundStyle = this.props.sex == item.value ? { backgroundColor: Color.primary } : {};
    let textFont = this.props.sex == item.value ? FontFamily.title : FontFamily.body;
    let textColor = this.props.sex == item.value ? Color.white : Color.gray;
    let isSelected = this.props.sex == item.value ? true : false;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.props.onPress(item.value)}
        style={[styles.card, Style.boxShadow, borderStyle, backgroundStyle]}>

        {isSelected ? <Image source={Images.checked} style={styles.checkedIconStyle} /> : null}

        <Image source={Images[item.iconName]} style={{ width: 60, height: 60 }} />
        <Text style={{ fontFamily: textFont, color: textColor, marginVertical: 5 }}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  _renderSexOption() {
    let list = [
      { title: 'ប្រុស', value: 'male', iconName: 'male' },
      { title: 'ស្រី', value: 'female', iconName: 'female' },
    ];
    let space = <View style={{ width: 24 }} />;
    let doms = list.map((item, index) => this._buildOption(item, index))
    doms = InjectArray(doms, space);

    return (
      <View style={styles.cardWrapper}>
        { doms}
      </View>
    )
  }

  render() {
    return (this._renderSexOption());
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
  },
  checkedIconStyle: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: 6,
    right: 6
  }
});
