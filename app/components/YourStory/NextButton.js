import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import uuidv4 from '../../utils/uuidv4';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

class NextButton extends Component {
  render() {
    const { disabled } = this.props;
    let hasSelectedAnswer = false;
    let bgStyle = disabled ? { backgroundColor: Color.gray } : { backgroundColor: Color.pink };
    let textStyle = disabled ? { color:  Color.textBlack} : { color: Color.white };

    return (
      <View style={[Style.boxShadow, styles.nextButton]}>
        <TouchableOpacity
          style={[styles.nextBtnAction, bgStyle]}
          { ...this.props }>

          <View style={{ width: 58 }} />

          <View style={styles.coverNextText}>
            <Text style={[styles.nextText, textStyle]}>{this.props.t('CreateYourStoryScreen.Next')}</Text>
          </View>

          <PlaySound
            filePath={''}
            buttonAudioStyle={{ backgroundColor: Color.white }}
            iconStyle={{ tintColor: Color.pink }}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nextButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Color.white,
  },
  nextBtnAction: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.pink,
    flexDirection: 'row'
  },
  coverNextText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: Color.white,
    fontFamily: FontFamily.title,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default withTranslation()(NextButton);
