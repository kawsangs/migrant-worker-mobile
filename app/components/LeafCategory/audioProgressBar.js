import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Slider from "react-native-slider";

import { Color, FontFamily } from '../../assets/stylesheets/base_style';

class AudioProgressBar extends Component {
  onSlidingComplete(value) {
    if (!this.props.hasAudioPlayer)
      return;

    this.props.changePlayingSecond(value);

    if (!this.props.isPlaying)
      this.props.playAudio();
  }

  onSlidingStart(value) {
    if (!this.props.hasAudioPlayer)
      return;

    if (this.props.isPlaying)
      this.props.playAudio();
  }

  getFormattedSecond = (second) => {
    return new Date(Math.round(second) * 1000).toISOString().substr(14, 5);
  }

  getReverseSecond() {
    if (this.props.loadedProgress) {
      const reverseSecond = this.props.playDuration - this.props.loadedProgress;

      return this.getFormattedSecond(reverseSecond);
    }

    return '00:00';
  }

  render() {
    return (
      <View style={{borderWidth: 0, marginBottom: 20}}>
        <Slider
          disabled={!this.props.hasAudioPlayer}
          style={{height: 30}}
          value={this.props.loadedProgress}
          minimumValue={0}
          maximumValue={this.props.playDuration}
          minimumTrackTintColor={ Color.primary }
          maximumTrackTintColor={ Color.lightGray }
          thumbStyle={{backgroundColor: !this.props.hasAudioPlayer ? Color.gray : Color.primary}}
          onSlidingComplete={(value) => this.onSlidingComplete(value)}
          onSlidingStart={(value) => this.onSlidingStart(value)}
          onValueChange={(value) => this.props.changePlayingSecond(value)}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5}}>
          <Text style={[{textAlign: 'left', fontSize: 12, fontWeight: 'bold'}]}>
            { this.getFormattedSecond(this.props.loadedProgress) }
          </Text>

           <Text style={[{textAlign: 'right', fontSize: 12, fontWeight: 'bold'}]}>- { this.getReverseSecond() }</Text>
        </View>
      </View>
    )  
  }
}

export default AudioProgressBar;