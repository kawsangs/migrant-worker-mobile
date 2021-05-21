'use strict';

const FormSchema = {
  name: 'Form',
  primaryKey: 'id',
  properties: {
    id: 'int',
    code: 'string',
    name: 'string',
    version: 'string?',
    question_count: 'int?'
  }
};

export default FormSchema;
