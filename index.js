/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import Notification from './app/models/Notification'

messaging().onMessage(async remoteMessage => {
  Notification.create(remoteMessage.notification);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  Notification.create(remoteMessage.notification);
});

AppRegistry.registerComponent(appName, () => App);
