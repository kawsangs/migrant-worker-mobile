'use strict';

import Realm from 'realm';
import categoryList from '../../json/categories';

class Category extends Realm.Object {
  get imageSource() {
    if (!this.image) { return "" }

    if (this.image == 'offline') {
      let cate = categoryList.filter(cate => cate.uuid == this.uuid)[0];
      return !!cate && cate.image;
    }

    return { uri: `file://${this.image}` };
  }

  get hintImageSource() {
    if (!this.hint_image) { return "" }

    if (this.hint_image == 'offline') {
      let cate = categoryList.filter(cate => cate.uuid == this.uuid)[0];
      return !!cate && cate.hint_image;
    }

    return { uri: `file://${this.hint_image}` };
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
    hint: 'string?',
    hint_image: 'string?',
    hint_image_url: 'string?',
    hint_audio: 'string?',
    hint_audio_url: 'string?',
    appVersion: 'string?',
  }
};

export default Category;
