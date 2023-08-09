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

messaging().onMessage(async remoteMessage => {
  Notification.create(remoteMessage.notification);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (Object.keys(remoteMessage.data).length > 0) {
    const data =  JSON.parse(remoteMessage.data.payload).data
    if (!!data.form_id)
      new SurveyFormService().findAndSave(data.form_id);
  }
  Notification.create(remoteMessage.notification);
});

messaging().onNotificationOpenedApp(remoteMessage => {
  if (Object.keys(remoteMessage.data).length > 0) {
    const data =  JSON.parse(remoteMessage.data.payload).data
    if (!!data.form_id) {
      // use setTimeout to prevent error when open app from quit state when the navigator hasn't finished mounting
      setTimeout(() => {
        RootNavigation.navigate('SurveyFormScreen', { form_id: data.form_id, title: remoteMessage.notification.title })
      }, 100)
      return
    }
  }

  setTimeout(() => {
    const notification = Notification.findByTitle(remoteMessage.notification.title);
    RootNavigation.navigate('NotificationDetailScreen', { uuid: notification.uuid });
  }, 100);
});

AppRegistry.registerComponent(appName, () => App);
