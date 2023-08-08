import messaging from '@react-native-firebase/messaging';

import Notification from '../models/Notification';
import * as RootNavigation from '../navigators/app_navigator';

const pushNotificationService = (() => {
  return {
    onNotificationOpendedApp
  }

  function onNotificationOpendedApp() {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('== notification remove msg = ', remoteMessage)
      const data = JSON.parse(remoteMessage.data.payload).data
      if (!!data.form_id) {
        // Todo:
        // 1. request to API to get the survey form detail -> save data to realm
        // 2. redirect to survey form screen
        return;
      }

      const notification = Notification.findByTitle(remoteMessage.notification.title);
      RootNavigation.navigate('NotificationDetailScreen', { uuid: notification.uuid });
    });
  }
})();

export default pushNotificationService;