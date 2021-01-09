import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import SoundPlayer from 'react-native-sound-player';
import { Color } from '../assets/stylesheets/base_style';
import Images from '../utils/images';

export default class PlaySound extends Component {
  _onFinishedPlayingSubscription = null;

  constructor(props) {
    super(props)
    this.state = {
      fileName: props.fileName
    };
  }

  componentDidMount() {
    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      this.props.onPress('');
    })
  }

  componentWillUnmount() {
    this._onFinishedPlayingSubscription.remove();
  }

  _playAudio() {
    this.props.onPress(this.state.fileName);

    SoundPlayer.playSoundFile(this.state.fileName, 'mp3');
  }

  render() {
    let isActive = (this.props.activePlaying == this.state.fileName);
    let iconName = this.props.iconName || Images.audio;
    let playIconName = this.props.playIconName || Images.active_play;
    let getBtnAudioStyle = this.props.buttonAudioStyle;
    let getIconStyle = this.props.iconStyle;

    return (
      <TouchableOpacity
        onPress={() => this._playAudio()}
        style={this.props.style}
        activeOpacity={0.7}
      >
        <View style={[styles.buttonAudio, getBtnAudioStyle]}>
          {(!isActive) && <Image source={iconName} style={[styles.iconStyle, getIconStyle]} />}
          {isActive && <Image source={playIconName} style={[styles.iconStyle, getIconStyle]} />}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonAudio: {
    backgroundColor: Color.primary,
    borderRadius: 18,
    width: 36,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle: {
    width: 36,
    height: 36
  }
});
