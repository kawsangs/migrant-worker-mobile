import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

const MODEL_NAME = 'Notification';
const Notification = (() => {
  return {
    all,
    find,
    create,
    update,
    hasUnread,
    markAsRead,
  };

  function all() {
    return realm.objects(MODEL_NAME).sorted('received_date', true)
  }

  function find(uuid) {
    return realm.objects(MODEL_NAME).filtered(`uuid = '${uuid}'`)[0];
  }

  function create(item) {
    realm.write(() => {
      realm.create(MODEL_NAME, _buildData(item), 'modified')
    });
  }

  function update(uuid, params) {
    realm.write(() => {
      realm.create(MODEL_NAME, Object.assign(params, {uuid: uuid}), 'modified');
    });
  }

  function hasUnread() {
    const notifications = all();

    for (let i = 0; i < notifications.length; i ++) {
      if (!notifications[i].is_read)
        return true;
    }

    return false;
  }

  function markAsRead() {
    let notifications = all();
    notifications = notifications.filter(notification => notification.is_read == false);

    notifications.map(item => {
      if (item)
        update(item.uuid, { is_read: true });
    });
  }

  // privte method
  function _buildData(item) {
    let params = {
      uuid: uuidv4(),
      title: item.title,
      content: item.body,
      image: null,
      received_date: new Date(),
      is_read: false,
    };

    return params;
  }
})();

export default Notification;