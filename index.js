/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import notificationService from './app/services/notification_service';

notificationService.onNotificationArrivedInBackground();
notificationService.onNotificationArrivedInForeground();
notificationService.onNotificationOpenedApp();

AppRegistry.registerComponent(appName, () => App);
