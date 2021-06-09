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
import IndexWorker from './app/workers/index_worker';
import { Color, FontFamily, FontSize } from './app/assets/stylesheets/base_style';

import configureStore from './app/store/configureStore';
import { Provider } from 'react-redux';

import * as Sentry from '@sentry/react-native';
import TranslationHelper from './app/translations';
import RegisteredTokenService from './app/services/registered_token_service';
import messaging from '@react-native-firebase/messaging';

import Notification from './app/models/Notification'

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

const store = configureStore();

setCustomText(customTextProps);

export default class App extends React.Component {

  async UNSAFE_componentWillMount() {
    await TranslationHelper.configure();
    await TranslationHelper.loadLanguage();
  }

  componentDidMount() {
    SplashScreen.hide();
    IndexWorker.init();
    RegisteredTokenService.handleSyncingToken();
    this.handleNotification();
  }

  handleNotification() {
    messaging().onMessage(async remoteMessage => {
      console.log("onMessage foreground!", remoteMessage)
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("onNotificationOpenedApp", remoteMessage)
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      Notification.create(remoteMessage.notification);
    });
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <AppNavigator/>
        </ThemeContext.Provider>
      </Provider>
    )
  }
};
