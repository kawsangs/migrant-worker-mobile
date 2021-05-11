'use strict';

const FormSchema = {
  name: 'Form',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    form_type: 'string?',
    version: 'string?',
    question_count: 'int?'
  }
};

export default FormSchema;
