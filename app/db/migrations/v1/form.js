'use strict';

import formList from '../../json/form_stories';

class Form {
  get imageSource() {
    if (!this.image) { return "" }

    if (this.image == 'offline') {
      let form = formList.filter(form => form.code == this.code)[0];
      return !!form && form.image;
    }

    return { uri: `file://${this.image}` };
  }
}

Form.schema = {
  name: 'Form',
  primaryKey: 'id',
  properties: {
    id: 'int',
    code: 'string',
    name: 'string',
    version: 'string?',
    question_count: 'int?',
    image: 'string?',
    image_url: 'string?',
    audio: 'string?',
    audio_url: 'string?'
  }
};

export default Form;
