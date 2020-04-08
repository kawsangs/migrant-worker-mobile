import React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';

import { ThemeContext, getTheme } from 'react-native-material-ui';
import { setCustomText} from 'react-native-global-props';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './app/navigators/app_navigator';

import { Color, FontFamily, FontSize } from './app/assets/stylesheets/base_style';

const customTextProps = {
  style: {
    fontFamily: FontFamily.body,
    color: 'rgba(0,0,0,.87)',
    fontSize: FontSize.body
  }
};

const uiTheme = {
  fontFamily: FontFamily.body,
  palette: {
    primaryColor: Color.primary
  },
};

setCustomText(customTextProps);

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <AppNavigator ref="app"/>
      </ThemeContext.Provider>
    )
  }
};
