import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';
import { InjectArray } from '../utils/math';
import i18n from 'i18next';

class SexOption extends Component {
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
        style={[styles.card, Style.boxShadow, borderStyle]}>
        <ImageBackground source={Images[item.iconName]} style={{
          width: '100%',
          height: '100%',
          resizeMode: "cover",
        }}>

          {isSelected ? <Image source={Images.checked} style={styles.checkedIconStyle} /> : null}

          {/* <Image source={Images[item.iconName]}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            // borderWidth: 1,
            borderColor: "red"
          }} /> */}
          <Text style={{
            fontFamily: textFont,
            color: Color.white,
            marginVertical: 5,
            position: 'absolute',
            marginHorizontal: 10
          }}>{item[`title_${i18n.language}`]}</Text>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  _renderSexOption() {
    let list = [
      {
        title_en: 'Male',
        title_kh: 'ប្រុស',
        value: 'male',
        iconName: 'male'
      },
      {
        title_en: 'Female',
        title_kh: 'ស្រី',
        value: 'female',
        iconName: 'female'
      },
      {
        title_en: 'Hidden',
        title_kh: 'មិនបញ្ចេញ',
        value: 'none',
        iconName: 'hidden_sex'
      },
    ];
    let space = <View style={{ width: 10 }} />;
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
    // borderWidth: 3,
    borderColor: '#fff',
    // paddingTop: 10,
    // paddingBottom: 10,
    height: 110,
    borderRadius: 8,
    overflow: 'hidden'
  },
  checkedIconStyle: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1
  }
});

export default withTranslation()(SexOption)