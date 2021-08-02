import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';

class WelcomeVideoSkipButton extends Component {
  renderButtonAudio() {
    return (
      <PlaySound
        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 58}}
        buttonAudioStyle={{ backgroundColor: Color.white }}
        iconStyle={{ tintColor: Color.primary }}
        filePath=''
        audioPlayer={this.props.audioPlayer}
        updateMainAudioPlayer={(sound) => this.props.updateMainAudioPlayer(sound)}
      />
    )
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={styles.btn}>
        <View style={{ width: 58 }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.btnText}>រំលង</Text>
        </View>
        {this.renderButtonAudio()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    flexDirection: 'row'
  },
  btnText: {
    color: Color.white,
    fontFamily: FontFamily.title,
  },
});

export default WelcomeVideoSkipButton;