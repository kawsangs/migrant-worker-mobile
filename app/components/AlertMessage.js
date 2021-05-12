import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import { Dialog, DialogDefaultActions, Icon } from 'react-native-material-ui';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

class AlertMessage extends Component {
  render() {
    if (!this.props.show) {
      return (null);
    }

    return (
      <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center', zIndex: 10, elevation: 3}}>
        <Dialog>
          { this.props.title &&
            <Dialog.Title><Text>{this.props.title}</Text></Dialog.Title>
          }

          <Dialog.Content>
            <View style={{flexDirection: 'row'}}>
              { this.props.warning &&
                <Icon name={"exclamation-triangle"} iconSet="FontAwesome" style={{color: Color.red, marginRight: 10}}/>
              }

              <Text style={{flex: 1}}>{ this.props.message }</Text>
            </View>
          </Dialog.Content>

          <Dialog.Actions>
            <DialogDefaultActions
               actions={['ok']}
               options={{ ok: { } }}
               onActionPress={() => {this.props.onPressAction()}}
            />
          </Dialog.Actions>
        </Dialog>
      </View>
    );
  }
}

export default withTranslation()(AlertMessage);
