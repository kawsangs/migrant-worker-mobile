/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import Notification from './app/models/Notification';
import * as RootNavigation from './app/navigators/app_navigator';

messaging().onMessage(async remoteMessage => {
  Notification.create(remoteMessage.notification);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  Notification.create(remoteMessage.notification);
});

messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('== notification remove msg = ', remoteMessage)

  const notification = Notification.findByTitle(remoteMessage.notification.title);
  RootNavigation.navigate('NotificationDetailScreen', { uuid: notification.uuid });
});

AppRegistry.registerComponent(appName, () => App);
