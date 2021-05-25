'use strict';

const CriteriaSchema = {
  name: 'Criteria',
  primaryKey: 'id',
  properties: {
    id: 'int',
    question_id: 'int',
    question_code: 'string',
    operator: 'string',
    response_value: 'string',
  }
};

export default CriteriaSchema;
