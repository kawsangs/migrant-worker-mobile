'use strict';

const AnswerSchema = {
  name: 'Answer',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    question_id: 'int',
    question_code: 'string',
    value: 'string',
    score: { type: 'int', default: 0 },
    user_uuid: 'string',
    quiz_uuid: 'string',
  }
};

export default AnswerSchema;
