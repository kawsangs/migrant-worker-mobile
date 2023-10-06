'use strict';

import Realm from 'realm';
import formList from '../../json/form_stories';
const questionList = formList.reduce((sum, item) => sum.concat(item.questions), []);
const optionList = questionList.reduce((sum, item) => sum.concat(item.options), []);

class Option extends Realm.Object {
  get imageSource() {
    if (!this.image) { return "" }

    if (this.image == 'offline') {
      let option = optionList.filter(option => option.id == this.id)[0];
      return !!option && option.image;
    }

    return { uri: `file://${this.image}` };
  }
}

Option.schema = {
  name: 'Option',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    value: 'string',
    score: { type: 'int', default: 0 },
    alert_message: 'string?',
    alert_audio: 'string?',
    alert_audio_url: 'string?',
    warning: { type: 'bool', default: false },
    recursive: { type: 'bool', default: false },
    question_id: 'int',
    question_code: 'string',
    image: 'string?',
    image_url: 'string?',
    icon: 'string?'
  }
};

export default Option;
