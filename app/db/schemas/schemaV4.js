import Institution from '../migrations/v3/institution'
import User from '../migrations/v4/user';
import Form from '../migrations/v4/form'
import Notification from '../migrations/v4/notification';
import Video from '../migrations/v4/video'
import Question from '../migrations/v4/question'
import Country from '../migrations/v4/country'
import helper from './helper';

const changedSchemas = [
  { label: 'User', data: User },
  { label: 'Institution', data: Institution },
  { label: 'Form', data: Form },
  { label: 'Notification', data: Notification },
  { label: 'Video', data: Video },
  { label: 'Question', data: Question },
  { label: 'Country', data: Country }
];

const schemaV4 = {
  schema: helper.getSchemas(changedSchemas),
  schemaVersion: 4,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 4) {
      const oldObjects = oldRealm.objects('Form');
      const newObjects = newRealm.objects('Form');
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].type = !oldObjects[i].type ? 'your_story' : oldObjects[i].type;
      }

      const oldQuestions = oldRealm.objects('Question');
      const newQuestions = newRealm.objects('Question');
      for (let i = 0; i < oldQuestions.length; i++) {
        newQuestions[i].section_id = !oldQuestions[i].section_id ? null : oldQuestions[i].section_id;
      }

      const oldNotifications = oldRealm.objects('Notification');
      const newNotifications = newRealm.objects('Notification');
      for (let i = 0; i < oldNotifications.length; i++) {
        newNotifications[i].data = !oldNotifications[i].data ? null : oldNotifications[i].data;
      }

      const oldUsers = oldRealm.objects('User');
      const newUsers = newRealm.objects('User');
      for (let i = 0; i < oldUsers.length; i++) {
        newUsers[i].id = !oldUsers[i].id ? null : oldUsers[i].id;
      }
    }
  }
}

export default schemaV4;