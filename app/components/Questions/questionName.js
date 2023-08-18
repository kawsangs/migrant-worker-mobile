import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';

class QuestonName extends Component {
  render() {
    const { question } = this.props;

    return (
      <View style={{flexDirection: 'row'}} >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FontFamily.title }}>{question.name}</Text>
        </View>

        <CustomAudioPlayerComponent
          itemUuid={`question_${question.id}`}
          audio={this.props.audio || question.audio}
          buttonBackgroundColor={Color.pink}
          iconColor={Color.white}
          rippled={true}
        />
      </View>
    );
  }
}

export default QuestonName;
