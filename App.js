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

const customTextProps = {
  style: {
    fontFamily: 'KhSiemreap',
    color: 'rgba(0,0,0,.87)',
    fontSize: 16
  }
};

const uiTheme = {
  fontFamily: 'KhSiemreap',
  palette: {
    // primaryColor: '#f55b1f',
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
