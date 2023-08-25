import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

import { Color } from '../../assets/stylesheets/base_style';
import audioPlayerService from '../../services/audio_player_service';
import audioUtil from '../../utils/audio_util';

class AudioProgressBar extends Component {
  onSlidingComplete(value) {
    // Seek and resume play the audio after stop sliding
    audioPlayerService.seekTo(this.props.audioPlayer, value[0]);
    audioPlayerService.playPause(this.props.audioPlayer, null,
      (audioPlayer, playSeconds, duration, countInterval) => {
        this.props.updateAudioPlayer(audioPlayer, playSeconds, duration, countInterval);
      }
    );
  }

  onSlidingStart() {
    clearInterval(this.props.countInterval);
    if (!this.props.audioPlayer)
      return;

    this.props.audioPlayer.pause();
  }

  render() {
    return (
      <View style={{borderWidth: 0, marginBottom: 20}}>
        <Slider
          disabled={!this.props.audioPlayer}
          style={{height: 30}}
          value={this.props.playSeconds}
          minimumValue={0}
          maximumValue={this.props.duration}
          minimumTrackTintColor={ Color.primary }
          maximumTrackTintColor={ Color.lightGray }
          thumbStyle={{backgroundColor: !this.props.audioPlayer ? Color.gray : Color.primary}}
          onSlidingComplete={(value) => this.onSlidingComplete(value)}
          onSlidingStart={(value) => this.onSlidingStart()}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5}}>
          <Text style={[{textAlign: 'left', fontSize: 12, fontWeight: 'bold'}]}>
            {audioUtil.getFormattedPlaySeconds(this.props.playSeconds)}
          </Text>
          <Text style={[{textAlign: 'right', fontSize: 12, fontWeight: 'bold'}]}>- { audioUtil.getReverseSeconds(this.props.playSeconds, this.props.duration) }</Text>
        </View>
      </View>
    )  
  }
}

export default AudioProgressBar;