'use strict';

const SectionSchema = {
  name: 'Section',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    form_id: 'int',
    display_order: 'int',
  }
};

export default SectionSchema;
