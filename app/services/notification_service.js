import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Notification from '../models/Notification';
import Visit from '../models/Visit';
import SurveyFormService from './survey_form_service';
import * as RootNavigation from '../navigators/app_navigator';

const notificationService = (() => {
  return {
    onNotificationArrivedInBackground,
    onNotificationArrivedInForeground,
    onNotificationOpenedApp,
  }

  // when receiving push notification when the app is in background or terminated (works when called in the index.js)
  function onNotificationArrivedInBackground() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      _saveNotificationAndSurvey(remoteMessage);
    });
  }

  // when receiving push notification when the app is in foreground (works when called in the App.js)
  function onNotificationArrivedInForeground() {
    messaging().onMessage(async remoteMessage => {
      _saveNotificationAndSurvey(remoteMessage);
    });
  }

  function onNotificationOpenedApp() {
    // when the notification open the app from a background state (worked)
    messaging().onNotificationOpenedApp(remoteMessage => {
      _handleScreenNavigation(remoteMessage);
    });

    // when the notification opened the app from a quit state (worked)
    // This method also get called when the app launched without receiving any push notification
    messaging().getInitialNotification()
      .then( remoteMessage => {
        _saveNotificationAndSurvey(remoteMessage);  // check and save the notification and survey
        _handleScreenNavigation(remoteMessage);
      })
  }

  // private method
  function _saveNotificationAndSurvey(remoteMessage) {
    if (!!remoteMessage && Object.keys(remoteMessage.data).length > 0) {
      const data =  JSON.parse(remoteMessage.data.payload) || null;
      if (!data) return;

      if (!Notification.findById(data.notification_id))
        Notification.create({...remoteMessage.notification, id: data.notification_id, data: data})

      const surveyFormService = new SurveyFormService();
      if (!!data.form_id && !surveyFormService.isExist(data.form_id))
        surveyFormService.findAndSave(data.form_id);
    }
  }

  function _handleScreenNavigation(remoteMessage) {
    if (!!remoteMessage && Object.keys(remoteMessage.data).length > 0) {
      const data =  JSON.parse(remoteMessage.data.payload) || null;
      if (!data) return;

      const notification = Notification.findById(data.notification_id);
      if (!!data.form_id) {
        _navigateToSurveyScreen(remoteMessage.notification.title, data, notification);
        return;
      }
      !!notification && _navigateToNextScreen('NotificationDetailScreen', { uuid: notification.uuid });
    }
  }

  function _navigateToSurveyScreen(title, data, notification) {
    Visit.upload({
      pageable_type: 'NotificationOccurrence',
      pageable_id: data.notification_occurrence_id,
      code: 'open_remote_notification',
      name: 'Open remote notification',
    });
    !!notification && _navigateToNextScreen('SurveyFormScreen', { uuid: notification.uuid, form_id: data.form_id, title: title });
  }

  async function _navigateToNextScreen(screenName, params) {
    if (!!JSON.parse(await AsyncStorage.getItem('CURRENT_USER'))) {
      setTimeout(() => {
        RootNavigation.navigate(screenName, params)
      }, 100)
    }
  }
})();

export default notificationService;