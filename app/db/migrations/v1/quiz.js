'use strict';

const QuizSchema = {
  name: 'Quiz',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    user_uuid: 'string',
    form_id: 'int',
    quizzed_at: 'date',
    finished: 'bool?',
    uploaded_id: 'int?'
  }
};

export default QuizSchema;
