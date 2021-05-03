'use strict';

const CriteriaSchema = {
  name: 'Criteria',
  properties: {
    code: 'string',
    operator: 'string',
    value: 'int[]'
  }
};

export default CriteriaSchema;
