import Institution from '../migrations/v3/institution'
import User from '../migrations/v4/user';
import Form from '../migrations/v4/form'
import Notification from '../migrations/v4/notification';
import Video from '../migrations/v4/video'
import Question from '../migrations/v4/question'
import Country from '../migrations/v5/country'
import Option from '../migrations/v6/option'
import helper from './helper';

const changedSchemas = [
  { label: 'User', data: User },
  { label: 'Institution', data: Institution },
  { label: 'Form', data: Form },
  { label: 'Option', data: Option },
  { label: 'Notification', data: Notification },
  { label: 'Video', data: Video },
  { label: 'Question', data: Question },
  { label: 'Country', data: Country }
];

const schemaV6 = {
  schema: helper.getSchemas(changedSchemas),
  schemaVersion: 6,
  migration: (oldRealm, newRealm) => {}
}

export default schemaV6;