import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUserAction';
import { setCurrentPlayingAudio } from '../../actions/currentPlayingAudioAction';

import User from '../../models/User';
import WelcomeMessage from '../../components/welcome_message';
import WelcomeVideoPlayer from '../../components/WelcomeVideo/welcomeVideoPlayer';
import BigButtonComponent from '../../components/shared/BigButtonComponent';
import CustomAudioPlayerComponent from '../../components/shared/CustomAudioPlayerComponent';

class WelcomeVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullScreen: false,
    };
  }

  async goToHomeScreen() {
    !!this.props.currentPlayingAudio && this.props.setCurrentPlayingAudio(null);
    this.props.setCurrentUser(User.find(this.props.route.params.user_uuid));
  }

  renderAudioButton() {
    return <CustomAudioPlayerComponent
              itemUuid='skip-button'
              audio='skip.mp3'
              buttonBackgroundColor={Color.white}
              iconColor={Color.primary}
              buttonStyle={{marginRight: 10}}
            />
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <WelcomeVideoPlayer onVideoEnd={() => this.goToHomeScreen()} />

        <View style={{paddingHorizontal: 16, flex: 1, paddingBottom: 22}}>
          <WelcomeMessage showTitle={false} containerStyle={{ marginTop: 10, paddingHorizontal: 0 }} contentStyle={{padding: 0}} hasAudioButton={true} />
          <View style={{flex: 1}} />
          <BigButtonComponent
            label="រំលង"
            onPress={() => this.goToHomeScreen()}
            rightComponent={this.renderAudioButton()}
          />
        </View>
      </View>
    )
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeVideo);