import React, { Component } from 'react';
import { Icon, Toolbar } from 'react-native-material-ui';
import { StackActions } from '@react-navigation/native';
import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';

export default class MyToolbar extends Component {
  _goHome() {
    this.props.navigation.dispatch(StackActions.popToTop());
  }

  render() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={this.props.title}
        rightElement={'home'}
        onRightElementPress={() => this._goHome()}
        size={30}
        style={{
          titleText: {
            fontFamily: FontFamily.title,
            textAlign: 'center',
          },
          centerElementContainer: {
            marginLeft: 0
          },
          container: {
            width: '100%',
            backgroundColor: Color.red,
          },
        }}
      />
    );
  }
}
