import React from 'react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import { setCustomText} from 'react-native-global-props';
import SplashScreen from 'react-native-splash-screen';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import AppNavigator from './app/navigators/app_navigator';
import IndexWorker from './app/workers/index_worker';
import { Color, FontFamily, FontSize } from './app/assets/stylesheets/base_style';

import configureStore from './app/store/configureStore';
import { Provider } from 'react-redux';

import * as Sentry from '@sentry/react-native';
import TranslationHelper from './app/translations';
import RegisteredTokenService from './app/services/registered_token_service';
import Video from './app/models/Video';
import Visit from './app/models/Visit';

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

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.primary,
  },
}

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
    new RegisteredTokenService().handleSyncingToken();
    Video.seedData();
    Visit.upload({
      pageable_type: 'Page',
      code: 'app_visit',
      name: 'App visit',
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={paperTheme}>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <AppNavigator/>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      </Provider>
    )
  }
};

export default App;