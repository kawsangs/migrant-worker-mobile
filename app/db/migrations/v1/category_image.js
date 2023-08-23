'use strict';

import Realm from 'realm';
import categoryList from '../../json/categories';
const categoryImages = categoryList.reduce((sum, item) => sum.concat(item.category_images), []);

class CategoryImage extends Realm.Object {
  get offlineSource() {
    return categoryImages.filter(cate => cate.id == this.id)[0].image;
  }

  get imageSource() {
    if (this.image == 'offline') {
      return categoryImages.filter(cate => cate.id == this.id)[0].image;
    }

    return { uri: `file://${this.image}` };
  }
}

CategoryImage.schema = {
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

export default CategoryImage;
