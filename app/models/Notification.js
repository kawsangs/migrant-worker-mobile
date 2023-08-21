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
    findByTitle,
    destroy,
  };

  function all() {
    return realm.objects(MODEL_NAME).sorted('received_date', true)
  }

  function find(uuid) {
    return realm.objects(MODEL_NAME).filtered(`uuid = '${uuid}'`)[0];
  }

  function create(item) {
    realm.write(() => {
      realm.create(MODEL_NAME, _buildData(item))
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

  function findByTitle(title) {
    return realm.objects(MODEL_NAME).filtered(`title = '${title}'`)[0];
  }

  function destroy(uuid) {
    realm.write(() => {
      let obj = realm.objects(MODEL_NAME).filtered('uuid="' + uuid + '"')[0];
      realm.delete(obj);
    });
  }

  // privte method
  function _buildData(item) {
    let params = {
      uuid: uuidv4(),
      title: item.title,
      content: item.body,
      received_date: new Date(),
      is_read: false,
      data: !!item.data ? JSON.stringify(item.data) : null,
    };

    return params;
  }
})();

export default Notification;