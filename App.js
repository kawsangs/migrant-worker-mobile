import React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
import seedDataService from './app/services/seed_data_service';

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

class App extends React.Component {

  async UNSAFE_componentWillMount() {
    await TranslationHelper.configure();
    await TranslationHelper.loadLanguage();
  }

  componentDidMount() {
    SplashScreen.hide();
    IndexWorker.init();
    RegisteredTokenService.handleSyncingToken();
    seedDataService.seedToRealm()
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <AppNavigator/>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeContext.Provider>
      </Provider>
    )
  }
};

export default App;