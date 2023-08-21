/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import Notification from './app/models/Notification';
import * as RootNavigation from './app/navigators/app_navigator';
import SurveyFormService from './app/services/survey_form_service';
import notificationService from './app/services/notification_service';

messaging().onMessage(async remoteMessage => {
  notificationService.create(remoteMessage);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (Object.keys(remoteMessage.data).length > 0) {
    const data =  JSON.parse(remoteMessage.data.payload).data
    if (!!data.form_id)
      new SurveyFormService().findAndSave(data.form_id);
  }

  notificationService.create(remoteMessage);
});

messaging().onNotificationOpenedApp(remoteMessage => {
  const notification = Notification.findByTitle(remoteMessage.notification.title);
  if (Object.keys(remoteMessage.data).length > 0) {
    const data =  JSON.parse(remoteMessage.data.payload).data
    if (!!data.form_id) {
      // use setTimeout to prevent error when open app from quit state when the navigator hasn't finished mounting
      setTimeout(() => {
        RootNavigation.navigate('SurveyFormScreen', { uuid: notification.uuid, form_id: data.form_id, title: remoteMessage.notification.title })
      }, 100)
      return
    }
  }

  setTimeout(() => {
    RootNavigation.navigate('NotificationDetailScreen', { uuid: notification.uuid });
  }, 100);
});

AppRegistry.registerComponent(appName, () => App);
