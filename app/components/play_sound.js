import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../assets/stylesheets/base_style';
import Images from '../utils/images';

export default class PlaySound extends Component {

  componentWillUnmount() {
    if (this.sound) this.sound.release();
  }

  _isAudioPlaying() {
    // Checking the audio path from main Audio Player with the current audio path
    if (this.props.audioPlayer && this.props.filePath.includes(this.props.audioPlayer._filename))
      return true;

    return false;
  }

  _playAudio() {
    if (this.props.audioPlayer)
      this.props.audioPlayer.release();

    if (this._isAudioPlaying()) {
      if (this.sound) this.sound.release();

      this.props.updateMainAudioPlayer(null);
      return;
    }

    Sound.setCategory('Playback');

    let folder = this.props.filePath.split('/').length > 1 ? '' : Sound.MAIN_BUNDLE;

    this.sound = new Sound(this.props.filePath, folder, (error) => {
      if (error) { return console.log('failed to load the sound', error); }

      this.sound.play(this.playComplete);
    });

    if (this.props.updateMainAudioPlayer)
      this.props.updateMainAudioPlayer(this.sound);
  }

  playComplete = (success) => {
    if (success) {
      this.props.updateMainAudioPlayer(null);
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  }

  renderVolumeOff() {
    return (
      <View style={this.props.style}>
        <View style={[styles.buttonAudio, {backgroundColor: Color.gray}]}>
          <Icon name={"md-volume-off"} color={"#fff"} />
        </View>
      </View>
    )
  }

  render() {
    if (!this.props.filePath) {
      return this.renderVolumeOff();
    }

    let icon = Images.audio;

    if (this._isAudioPlaying())
      icon = Images.active_play;

    return (
      <TouchableOpacity
        onPress={() => this._playAudio()}
        style={this.props.style}
        activeOpacity={0.7}>

        <View style={[styles.buttonAudio, this.props.buttonAudioStyle]}>
          <Image source={icon} style={[styles.iconStyle, this.props.iconStyle]} />
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
