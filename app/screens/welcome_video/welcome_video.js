import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUserAction';

import User from '../../models/User';
import WelcomeMessage from '../../components/welcome_message';
import WelcomeVideoPlayer from '../../components/WelcomeVideo/welcomeVideoPlayer';
import WelcomeVideoSkipButton from '../../components/WelcomeVideo/welcomeVideoSkipButton';

class WelcomeVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audioPlayer: null,
      isFullScreen: false,
    };
  }

  async goToHomeScreen() {
    this._clearAudioPlayer();
    this.props.setCurrentUser(User.find(this.props.route.params.user_uuid));
  }

  _clearAudioPlayer() {
    if (this.state.audioPlayer) {
      this.state.audioPlayer.release();
      this.setState({ audioPlayer: null });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <WelcomeVideoPlayer onVideoEnd={() => this.goToHomeScreen()} />

        <View style={{paddingHorizontal: 16, flex: 1, paddingBottom: 22}}>
          <WelcomeMessage showTitle={false} containerStyle={{ marginTop: 10, paddingHorizontal: 0 }} contentStyle={{padding: 0}}/>
          <View style={{flex: 1}} />
          <WelcomeVideoSkipButton
            onPress={() => this.goToHomeScreen()}
            audioPlayer={this.state.audioPlayer}
            updateMainAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeVideo);