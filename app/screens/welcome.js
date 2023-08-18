import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeSmallScreenContent from '../components/Welcome/welcome_small_screen_content';
import WelcomeBigScreenContent from '../components/Welcome/welcome_big_screen_content';
import WelcomeVideoButton from '../components/Welcome/welcome_video_button';

import { withTranslation } from 'react-i18next';

import { isSmallScreenDevice } from '../utils/responsive_util';
import User from '../models/User';
import uuidv4 from '../utils/uuidv4';

import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUserAction';
import {setCurrentPlayingAudio} from '../actions/currentPlayingAudioAction';

class Welcome extends React.Component {
  state = {};

  async _loginAsGuest() {
    this._clearAudioPlayer();
    let uuid = uuidv4();
    User.upsert({uuid: uuid, name: "ភ្ញៀវ", created_at: new Date()});
    User.uploadAsync(uuid);
    try {
      await AsyncStorage.setItem('IS_NEW_SESSION', 'true');
    } catch (e) {
    }

    this.props.navigation.navigate('WelcomeVideoScreen', { user_uuid: uuid });
  }

  _register() {
    this._clearAudioPlayer();
    this.props.navigation.navigate("RegisterScreen", {action: 'register'})
  }

  _clearAudioPlayer() {
    !!this.props.currentPlayingAudio && this.props.setCurrentPlayingAudio(null);
  }

  _onPressItem() {
    this._clearAudioPlayer()
    this.props.navigation.navigate('ViewVideoScreen', { videoId: require('../assets/videos/MYJOURNEY_LAUNCH_FILM_small.mp4'), isLocalVideo: true });
  }

  _renderContent() {
    return (
      isSmallScreenDevice() ?
        <WelcomeSmallScreenContent
          navigation={this.props.navigation}
          videoButton={<WelcomeVideoButton onPressItem={() => this._onPressItem()} />}
          register={() => this._register()}
          loginAsGuest={() => this._loginAsGuest()}
        />
      :
        <WelcomeBigScreenContent
          navigation={this.props.navigation}
          videoButton={<WelcomeVideoButton onPressItem={() => this._onPressItem()} />}
          register={() => this._register()}
          loginAsGuest={() => this._loginAsGuest()}
        />
    )
  }

  render() {
    return this._renderContent();
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentPlayingAudio: state.currentPlayingAudio
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCurrentPlayingAudio: (uuid) => dispatch(setCurrentPlayingAudio(uuid))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Welcome));
