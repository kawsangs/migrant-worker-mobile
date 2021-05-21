'use strict';

import categoryList from '../../json/categories';

class Category {
  get imageSource() {
    if (!this.image) { return "" }

    if (this.image == 'offline') {
      let cate = categoryList.filter(cate => cate.uuid == this.uuid)[0];
      return !!cate && cate.image;
    }

    return { uri: `file://${this.image}` };
  }
}

Category.schema = {
  name: 'Category',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'int',
    name: 'string',
    image: 'string?',
    image_url: 'string?',
    audio: 'string?',
    audio_url: 'string?',
    description: 'string?',
    type: 'string',
    parent_id: 'int?',
    last: { type: 'bool', default: false },
    leaf: { type: 'bool', default: false },
    lft: 'int',
    rgt: 'int',
    video: 'bool?',
  }
};

export default Category;
