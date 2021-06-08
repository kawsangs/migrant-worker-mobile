import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

const MODEL_NAME = 'Notification';
const Notification = (() => {
  return {
    all,
    find,
    create,
  };

  function all() {
    realm.objects(MODEL_NAME).sorted('received_date', false)
  }

  function find(uuid) {
    return realm.objects(MODEL_NAME).filtered(`uuid = ${uuid}`)[0];
  }

  function create(item) {
    realm.write(() => {
      realm.create(MODEL_NAME, _buildData(item))
    });
  }

  // privte method
  function _buildData(item) {
    let params = {
      uuid: uuidv4(),
      title: item.title,
      content: item.content,
      image: null,
      received_date: null,
      is_read: false,
    };

    return params;
  }
})();

export default Notification;