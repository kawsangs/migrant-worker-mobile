import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';

class QuestonName extends Component {
  render() {
    const { question } = this.props;

    return (
      <View style={{flexDirection: 'row'}} >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FontFamily.title }}>{question.name}</Text>
        </View>

        <PlaySound
          filePath={this.props.audio || question.audio}
          buttonAudioStyle={{ backgroundColor: Color.pink }}
          iconStyle={{ tintColor: Color.white }}
          audioPlayer={this.props.audioPlayer}
          updateMainAudioPlayer={(sound) => this.props.updateAudioPlayer(sound)}
        />
      </View>
    );
  }
}

export default QuestonName;
