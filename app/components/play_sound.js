import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Color } from '../assets/stylesheets/base_style';
import { Icon } from 'react-native-material-ui';
import SoundPlayer from 'react-native-sound-player';

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
    let iconName = this.props.iconName || 'volume-up';
    let playIconName = this.props.playIconName || 'play-circle-outline';

    return (
      <TouchableOpacity
        onPress={() => this._playAudio() }
        style={this.props.style}
      >
        <View style={styles.buttonAudio}>
          { (!isActive) && <Icon name={iconName} color='#fff' size={24} />}
          { isActive && <Icon name={playIconName} color='#fff' size={24} />}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonAudio: {
    backgroundColor: Color.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
