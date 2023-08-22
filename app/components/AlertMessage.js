import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { Color, FontFamily } from '../assets/stylesheets/base_style';
import { Dialog } from 'react-native-material-ui';
import OutlineInfoIcon from './OutlineInfoIcon';
import AppIcon from './AppIcon';

import { withTranslation } from 'react-i18next';
import CustomAudioPlayerComponent from './shared/CustomAudioPlayerComponent';
import AlertActionButtonsComponent from './shared/AlertActionButtonsComponent';
import { setCurrentPlayingAudio } from '../actions/currentPlayingAudioAction';

class AlertMessage extends Component {
  state = {};

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show != this.props.show)
      !!this.props.currentPlayingAudio && this.props.setCurrentPlayingAudio(null);
  }

  renderIcon() {
    return this.props.warning ? <AppIcon iconType='warning' customStyles={{marginRight: 10}} /> : <OutlineInfoIcon/>;
  }

  renderAudioPlayer() {
    return <CustomAudioPlayerComponent
              itemUuid='alert-dialog'
              audio={this.props.audio}
              buttonBackgroundColor={Color.red}
              isOutline={true}
            />
  }

  renderButtons() {
    return <AlertActionButtonsComponent
              leftLabel='បោះបង់' onPressLeft={() => this.props.onPressCancel()} hideLeftButton={!this.props.onPressCancel}
              rightLabel='បាទ/ចាស' onPressRight={() => this.props.onPressAction()}
           />
  }

  render() {
    if (!this.props.show) {
      return (null);
    }

    return (
      <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center', zIndex: 10, elevation: 3}}>
        <Dialog>
          <Dialog.Content>
            <View style={{marginHorizontal: -10}}>
              <View style={{flexDirection: 'row'}}>
                {this.renderIcon()}

                <View style={{flex: 1, paddingRight: 5, justifyContent: 'center'}}>
                  { this.props.title ?
                    <Text style={{fontFamily: FontFamily.title}}>{this.props.title}</Text>
                    :
                    <Text style={{fontFamily: FontFamily.title}}>សូមចំណាំ</Text>
                  }
                </View>
                { !this.props.hideAudio && this.renderAudioPlayer() }
              </View>
            </View>

            <Text style={{marginTop: 10}}>{ this.props.message }</Text>
          </Dialog.Content>

          <Dialog.Actions>
            {this.renderButtons()}
          </Dialog.Actions>
        </Dialog>
      </View>
    );
  }
}

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
)(withTranslation()(AlertMessage));