import Institution from '../migrations/v3/institution'
import User from '../migrations/v4/user';
import Form from '../migrations/v4/form'
import Notification from '../migrations/v7/notification';
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

const schemaV8 = {
  schema: helper.getSchemas(changedSchemas),
  schemaVersion: 8,
  migration: (oldRealm, newRealm) => {
    const oldNotifications = oldRealm.objects('Notification');
    for (let i = 0; i < oldNotifications.length; i++) {
      const data = !!oldNotifications[i].data ? JSON.parse(oldNotifications[i].data) : null;
      if (!!data && !!data.form_id) {
        const surveyForm = newRealm.objects('Form').filtered(`id = ${parseInt(data.form_id)}`)[0];
        const sections = newRealm.objects('Section').filtered(`form_id = ${parseInt(data.form_id)}`);
        sections.map(section => {
          const questions = newRealm.objects('Question').filtered(`section_id = '${section.id}'`);
          questions.length > 0 && newRealm.delete(questions)
        });
        sections.length > 0 && newRealm.delete(sections);
        !!surveyForm && newRealm.delete(surveyForm);
      }
    }
  }
}

export default schemaV8;