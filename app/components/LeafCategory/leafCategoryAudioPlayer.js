import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-material-ui';
import * as Progress from 'react-native-progress';

import { environment } from '../../config/environment';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import styles from '../../styles/categoryAudioPlayerComponentStyle';

import MiniSoundPlayer from './miniSoundPlayer';
import AudioProgressBar from './audioProgressBar';
import BottomHalfModal from '../bottomHalfModal';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
let _this = this;

export default class LeafCategoryAudioPlayer extends Component {
  state = {}

  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      showMiniPlayer: false,
      modalVisible: false,
      hasAudioPlayer: false,
    }
  }

  componentWillUnmount() {
    if (this.sound) this.sound.release();
  }

  _playAudio() {
    if (!this.props.category.audio)
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

    let folder = this.props.category.audio.split('/').length > 1 ? '' : Sound.MAIN_BUNDLE;

    this.sound = new Sound(this.props.category.audio, folder, (error) => {
      if (error) { return console.log('failed to load the sound', error); }

      this.setState({playing: true, hasAudioPlayer: true});
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
        hasAudioPlayer: false,
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, width: 200, alignSelf: 'center'}}>
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

  _renderImage() {
    return (<ImageBackground source={this.props.image} style={styles.cateImage} resizeMode='contain' />)
  }

  changePlaySecond(newSecond) {
    clearInterval(_this.countInterval);
    _this.sound.setCurrentTime(newSecond);
    _this.setState({ playSecond: newSecond });
  }

  _rendeProgressBar() {
    const loadedProgress = this.state.playSecond ? this.state.playSecond : 0;
    const playDuration = this.sound ? Math.round(this.sound.getDuration()) : 180;

    return (
      <AudioProgressBar
        hasAudioPlayer={this.state.hasAudioPlayer}
        loadedProgress={loadedProgress}
        playDuration={playDuration}
        changePlayingSecond={this.changePlaySecond}
        onSlidingStart={() => clearInterval(this.countInterval)}
        isPlaying={this.state.playing}
        playAudio={() => this._playAudio()}
      />
    )
  }

  disabledColor() {
    if (!this.props.category.audio)
      return { color: Color.lightGray };

    return {};
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y >= 266 && !_this.state.showMiniPlayer)
      _this.setState({ showMiniPlayer: true });
    else if (event.nativeEvent.contentOffset.y < 266 && _this.state.showMiniPlayer)
      _this.setState({ showMiniPlayer: false });
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle, { width: screenWidth }]}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 90, width: screenWidth}}
          onScroll={this.handleScroll}
        >
          { this._renderImage() }
          { this._rendeProgressBar() }
          { this._renderPlayIcons() }

          {this.props.children}
        </ScrollView>

        { this.state.showMiniPlayer &&
          <View style={styles.miniSoundPlayerContainer}>
            <MiniSoundPlayer
              image={this.props.image}
              title={this.props.category.name}
              playAudio={() => this._playAudio()}
              playing={this.state.playing}
              disabledColor={this.disabledColor()}
              openModal={() => this.setState({ modalVisible: true })}
            />
          </View>
        }

        <BottomHalfModal
          isVisible={this.state.modalVisible}
          closeModal={() => this.setState({ modalVisible: false })}
          modalContentStyle={{ height: screenHeight / 1.8 }}
        >
          <View>
            { this._renderImage() }
            { this._rendeProgressBar() }
            { this._renderPlayIcons() }
            <Text numberOfLines={1} style={{fontFamily: FontFamily.title, fontSize: 18, textAlign: 'center', marginBottom: 25}}>
              {this.props.category.name}
            </Text>
          </View>
        </BottomHalfModal>
      </View>
    )
  }
}