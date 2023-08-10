import Notification from '../models/Notification';

const notificationService = (() => {
  return {
    create
  }

  function create(remoteMessage) {
    let data = null;
    if (Object.keys(remoteMessage.data).length > 0)
      data = JSON.parse(remoteMessage.data.payload).data || null;

    Notification.create({...remoteMessage.notification, data: data})
  }
})();

export default notificationService;