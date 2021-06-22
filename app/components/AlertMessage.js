import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import { Dialog, DialogDefaultActions, Icon } from 'react-native-material-ui';
import PlaySound from './play_sound';

import OutlineInfoIcon from './OutlineInfoIcon';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

class AlertMessage extends Component {
  state = {};

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
                <OutlineInfoIcon />
                <View style={{flex: 1, paddingRight: 5, justifyContent: 'center'}}>
                  { this.props.title ?
                    <Text style={{fontFamily: FontFamily.title}}>{this.props.title}</Text>
                    :
                    <Text style={{fontFamily: FontFamily.title}}>សូមចំណាំ</Text>
                  }
                </View>

                <View style={{marginTop: 5}}>
                  <PlaySound
                    filePath={this.props.audio}
                    buttonAudioStyle={{backgroundColor: Color.red}}
                    iconStyle={{tintColor: Color.white}}
                    audioPlayer={this.props.audioPlayer}
                    updateMainAudioPlayer={(sound) => this.props.updateAudioPlayer(sound)}
                  />
                </View>
              </View>
            </View>

            <Text style={{marginTop: 10}}>{ this.props.message }</Text>
          </Dialog.Content>

          <Dialog.Actions>
            <View style={{flexDirection: 'row', padding: 16, justifyContent: 'flex-end'}}>
              { !!this.props.onPressCancel &&
                <TouchableOpacity onPress={() => this.props.onPressCancel()} style={{paddingHorizontal: 5, marginRight: 5}}><Text style={{color: Color.primary, fontSize: 14}}>បោះបង់</Text></TouchableOpacity>
              }
              <TouchableOpacity onPress={() => this.props.onPressAction()} style={{paddingLeft: 5, paddingRight: 0}}><Text style={{color: Color.primary, fontSize: 14}}>បាទ/ចាស</Text></TouchableOpacity>
            </View>
          </Dialog.Actions>
        </Dialog>
      </View>
    );
  }
}

export default withTranslation()(AlertMessage);
