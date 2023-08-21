'use strict';

const QuestionSchema = {
  name: 'Question',
  primaryKey: 'id',
  properties: {
    id: 'int',
    code: 'string',
    type: 'string',
    name: 'string',
    display_order: 'int',
    hint: 'string?',
    relevant: 'string?',
    required: {type: 'bool', default: false},
    audio: 'string?',
    audio_url: 'string?',
    passing_score: 'int?',
    passing_message: 'string?',
    passing_audio: 'string?',
    passing_audio_url: 'string?',
    failing_message: 'string?',
    failing_audio: 'string?',
    failing_audio_url: 'string?',
    form_id: 'int',
    section_id: 'string?'
  }
};

export default QuestionSchema;
