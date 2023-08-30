/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from './app/models/Notification';
import * as RootNavigation from './app/navigators/app_navigator';
import SurveyFormService from './app/services/survey_form_service';
import notificationService from './app/services/notification_service';
import Visit from './app/models/Visit';

messaging().onMessage(async remoteMessage => {
  notificationService.create(remoteMessage);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (Object.keys(remoteMessage.data).length > 0) {
    const data =  JSON.parse(remoteMessage.data.payload)
    if (!!data.form_id)
      new SurveyFormService().findAndSave(data.form_id);
  }

  notificationService.create(remoteMessage);
});

const navigateToNextScreen = async (screenName, params) => {
  if (!!JSON.parse(await AsyncStorage.getItem('CURRENT_USER'))) {
    setTimeout(() => {
      RootNavigation.navigate(screenName, params)
    }, 100)
  }
}

messaging().onNotificationOpenedApp(remoteMessage => {
  const notification = Notification.findByTitle(remoteMessage.notification.title);
  if (Object.keys(remoteMessage.data).length > 0) {
    const data =  JSON.parse(remoteMessage.data.payload)
    if (!!data.form_id) {
      Visit.upload({
        pageable_type: 'NotificationOccurrence',
        pageable_id: data.notification_occurrence_id,
        code: 'open_remote_notification',
        name: 'Open remote notification',
      });

      navigateToNextScreen('SurveyFormScreen', { uuid: notification.uuid, form_id: data.form_id, title: remoteMessage.notification.title });
      return
    }
  }

  navigateToNextScreen('NotificationDetailScreen', { uuid: notification.uuid });
});

AppRegistry.registerComponent(appName, () => App);
