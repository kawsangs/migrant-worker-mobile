'use strict';

const SkipLogicSchema = {
  name: 'SkipLogic',
  properties: {
    operator: 'string',
    criterias: { type: 'list', objectType: 'Criteria' }
  }
};

export default SkipLogicSchema;
