'use strict';

const OptionSchema = {
  name: 'Option',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    value: 'string',
    score: { type: 'int', default: 0 },
    alert_message: 'string?',
    alert_audio: 'string?',
    alert_audio_url: 'string?',
    warning: { type: 'bool', default: false },
    recursive: { type: 'bool', default: false },
    question_id: 'int',
    question_code: 'string',
  }
};

export default OptionSchema;
