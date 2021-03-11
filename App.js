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
import UserWorker from './app/workers/user_worker';
import Sidekiq from './app/utils/sidekiq';
import { Color, FontFamily, FontSize } from './app/assets/stylesheets/base_style';

import * as Sentry from '@sentry/react-native';
import TranslationHelper from './app/translations';

Sentry.init({
  dsn: 'https://b0b7fac69a6d45abb446ccfdc6e15423@o357910.ingest.sentry.io/5257533',
});


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

  async UNSAFE_componentWillMount() {
    await TranslationHelper.configure();
    await TranslationHelper.loadLanguage();
  }

  componentDidMount() {
    SplashScreen.hide();
    UserWorker.init();
    Sidekiq.uploadAllUsers();
  }

  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <AppNavigator ref="app"/>
      </ThemeContext.Provider>
    )
  }
};
