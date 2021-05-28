import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-material-ui';
import * as Progress from 'react-native-progress';

import { environment } from '../config/environment';
import { Color } from '../assets/stylesheets/base_style';

export default class SoundPlayer extends Component {
  state = {}

  componentWillUnmount() {
    if (this.sound) this.sound.release();
  }

  _playAudio() {
    if (!this.props.filePath)
      return;

    if (this.state.playing) {
      // Pause audio

      this.setState({playing: false});
      clearInterval(this.countInterval);

      if (this.sound)
        this.sound.pause();

      return;
    }
    else if (!this.state.playing && this.sound) {
      // Resume audio

      this.setState({playing: true});
      this.sound.play(this.playComplete);
      this.countSecond();
      return;
    }

    // Play audio
    Sound.setCategory('Playback');

    let folder = this.props.filePath.split('/').length > 1 ? '' : Sound.MAIN_BUNDLE;

    this.sound = new Sound(this.props.filePath, folder, (error) => {
      if (error) { return console.log('failed to load the sound', error); }

      this.setState({playing: true});
      this.countSecond();
      this.sound.play(this.playComplete);
    });
  }

  playComplete = (success) => {
    if (success) {
      clearInterval(this.countInterval);

      this.setState({
        playing: false,
        playSecond: null,
      });

      this.sound.release();
      this.sound = null;
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  }

  forwardRewindAudio(type) {
    if (!this.sound)
      return;

    // It will move the audio forward or backward for 3 seconds
    const duration = this.sound.getDuration();

    this.sound.getCurrentTime((seconds) => {
      if (seconds < 1 || seconds >= duration)
        return;

      clearInterval(this.countInterval);

      if (type == 'forward') {
        this.sound.setCurrentTime(seconds + environment.forward_rewind_audio_duration);
        this.setState({ playSecond: seconds + environment.forward_rewind_audio_duration });
      }
      else {
        const newSecond = seconds > environment.forward_rewind_audio_duration ? seconds - environment.forward_rewind_audio_duration : 0;
        this.sound.setCurrentTime(newSecond);
        this.setState({ playSecond: newSecond });
      }

      this.countSecond();
    });
  }

  _renderPlayIcons() {
    let icon = this.state.playing ? 'pause' : 'play';

    return (
      <View style={{flexDirection: 'row', width: '65%', justifyContent: 'space-between', alignItems: 'center', borderWidth: 0}}>
        <TouchableOpacity onPress={() => this.forwardRewindAudio('backward')} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <Icon name='backward' size={20} iconSet="FontAwesome" style={[styles.iconStyle, this.disabledColor()]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._playAudio()} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <Icon name={icon} iconSet="FontAwesome" size={this.props.iconSize}
            style={[styles.iconStyle, this.props.iconStyle, this.disabledColor()]}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.forwardRewindAudio('forward')} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <Icon name='forward' size={20} iconSet="FontAwesome" style={[styles.iconStyle, this.disabledColor()]} />
        </TouchableOpacity>
      </View>
    );
  }

  countSecond() {
    this.countInterval = setInterval(() => {
      if (this.sound) {
        this.sound.getCurrentTime((seconds) => {
          if (!this.state.playing)
            return clearInterval(this.countInterval);

          this.setState({ playSecond: seconds });
        });
      }
    }, 100);
  };

  getReverseSecond() {
    if (this.state.playSecond) {
      const reverseSecond = this.sound.getDuration() - this.state.playSecond;

      return this.getFormattedSecond(reverseSecond);
    }

    return '00:00';
  }

  getFormattedSecond = (second) => {
    return new Date(Math.round(second) * 1000).toISOString().substr(14, 5);
  }

  _rendeProgressBar() {
    const loadedProgress = this.state.playSecond ? this.state.playSecond : 0;
    const playDuration = this.sound ? Math.round(this.sound.getDuration()) : 180;

    return (
      <View style={[styles.progressBarContainer, this.props.progressBarContainerStyle]}>
        <Progress.Bar progress={loadedProgress / playDuration} width={null} color={Color.primary} unfilledColor='rgb(216, 216, 216)' borderColor='transparent' />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.durationLabel, {textAlign: 'left'}, this.disabledColor()]}>
            { this.state.playSecond ? this.getFormattedSecond(this.state.playSecond) : '00:00' }
          </Text>

          <Text style={[styles.durationLabel, {textAlign: 'right'}, this.disabledColor()]}>- { this.getReverseSecond() }</Text>
        </View>
      </View>
    );
  }

  disabledColor() {
    if (!this.props.filePath)
      return { color: Color.lightGray };

    return {};
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {this._rendeProgressBar()}

        { this._renderPlayIcons() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    paddingTop: 10,
  },
  iconStyle: {
    padding: 0,
    margin: 0,
  },
  progressBarContainer: {
    marginTop: -20,
    width: '75%',
    marginBottom: 30,
  },
  durationLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  }
});