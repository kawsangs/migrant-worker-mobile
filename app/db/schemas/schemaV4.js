import Institution from '../migrations/v3/institution'
import Form from '../migrations/v4/form'
import Notification from '../migrations/v4/notification';
import Video from '../migrations/v4/video'
import helper from './helper';

const changedSchemas = [
  { label: 'Institution', data: Institution },
  { label: 'Form', data: Form },
  { label: 'Notification', data: Notification },
  { label: 'Video', data: Video }
];

const schemaV4 = {
  schema: helper.getSchemas(changedSchemas),
  schemaVersion: 4,
  migration: (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects('Form');
    const newObjects = newRealm.objects('Form');

    for (let i = 0; i < oldObjects.length; i++) {
      newObjects[i].type = !oldObjects[i].type ? 'your_story' : oldObjects[i].type;
    }
  }
}

export default schemaV4;