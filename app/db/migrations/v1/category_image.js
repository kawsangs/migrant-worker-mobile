'use strict';

const CategoryImageSchema = {
  name: 'CategoryImage',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    image: 'string?',
    image_url: 'string',
    category_id: 'int',
  }
};

export default CategoryImageSchema;
