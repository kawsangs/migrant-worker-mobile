import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {connect} from 'react-redux';

import { Color, Style } from '../../assets/stylesheets/base_style';
import BigButtonComponent from '../shared/BigButtonComponent';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';
import { withTranslation } from 'react-i18next';
import { setCurrentPlayingAudio } from '../../actions/currentPlayingAudioAction';

class NextButton extends Component {
  renderAudioBtn() {
    return <CustomAudioPlayerComponent
              itemUuid='your-story-btn-next-audio'
              audio='next.mp3'
              buttonStyle={{backgroundColor: Color.white, marginRight: 8}}
              iconStyle={{color: Color.pink}}
           />
  }

  onPress() {
    !!this.props.currentPlayingAudio && this.props.setCurrentPlayingAudio(null);
    this.props.onPress()
  }

  render() {
    return (
      <View style={[Style.boxShadow, styles.nextButton]}>
        <BigButtonComponent
          disabled={this.props.disabled}
          label={this.props.t('CreateYourStoryScreen.Next')}
          rightComponent={this.renderAudioBtn()}
          buttonStyle={{backgroundColor: Color.pink}}
          onPress={() => this.onPress()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nextButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Color.white,
  }
});

function mapStateToProps(state) {
  return {
    currentPlayingAudio: state.currentPlayingAudio
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPlayingAudio: (uuid) => dispatch(setCurrentPlayingAudio(uuid))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(NextButton));