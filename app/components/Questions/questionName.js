import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';

class QuestonName extends Component {
  state = {};

  render() {
    const { question } = this.props;

    return (
      <View style={{flexDirection: 'row'}} >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FontFamily.title }}>{question.name}</Text>
        </View>

        <PlaySound
          fileName={'register'}
          buttonAudioStyle={{ backgroundColor: Color.pink }}
          iconStyle={{ tintColor: Color.white }}
          activePlaying={this.state.activePlaying}
          onPress={(fileName) => this.setState({ activePlaying: fileName })}
          style={{ marginHorizontal: 10 }}
        />
      </View>
    );
  }
}

export default QuestonName;
