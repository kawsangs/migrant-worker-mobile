import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import Sound from 'react-native-sound';
import { Icon } from 'react-native-material-ui';
import { Color } from '../assets/stylesheets/base_style';
import Images from '../utils/images';

export default class PlaySound extends Component {
  state = {}

  componentWillUnmount() {
    if (this.sound) this.sound.release();
  }

  _playAudio() {
    if (this.state.playing) {
      this.setState({playing: false});
      if (this.sound) this.sound.release();
      return;
    }

    Sound.setCategory('Playback');

    let folder = this.props.filePath.split('/').length > 1 ? '' : Sound.MAIN_BUNDLE;

    this.sound = new Sound(this.props.filePath, folder, (error) => {
      if (error) { return console.log('failed to load the sound', error); }

      this.setState({playing: true});
      this.sound.play(this.playComplete);
    });
  }

  playComplete = (success) => {
    if (success) {
      this.setState({playing: false});
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  }

  renderVolumeOff() {
    return (
      <View style={this.props.style}>
        <View style={[styles.buttonAudio, {backgroundColor: Color.gray}]}>
          <Icon name={"md-volume-off"} color={"#fff"} iconSet={"Ionicons"} />
        </View>
      </View>
    )
  }

  render() {
    if (!this.props.filePath) {
      return this.renderVolumeOff();
    }

    let icon = this.state.playing ? Images.active_play : Images.audio;

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
