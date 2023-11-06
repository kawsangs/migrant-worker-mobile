import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { connect } from 'react-redux';

import { Color, FontFamily } from '../assets/stylesheets/base_style';
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

  renderTitle() {
    return <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {this.renderIcon()}
              { this.props.title ?
                <Text style={{fontFamily: FontFamily.title, flex: 1}}>{this.props.title}</Text>
                :
                <Text style={{fontFamily: FontFamily.title, flex: 1}}>សូមចំណាំ</Text>
              }
              { !this.props.hideAudio && this.renderAudioPlayer() }
            </View>
  }

  render() {
    return (
      <Portal>
        <Dialog visible={this.props.show} style={{borderRadius: 2, backgroundColor: Color.white}} dismissable={true}
          onDismiss={() => !!this.props.onDismiss && this.props.onDismiss()}
        >
          <Dialog.Content style={{marginTop: 16}}>
            {this.renderTitle()}
            <Text style={{marginTop: 16}}>{ this.props.message }</Text>
          </Dialog.Content>

          <Dialog.Actions style={{paddingBottom: 18, paddingRight: 18}}>
            {this.renderButtons()}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
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