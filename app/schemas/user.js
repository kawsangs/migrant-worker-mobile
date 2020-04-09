'use strict';

const UserSchema = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string?',
    sex: 'string?',
    age: 'string?',
    phoneNumber: 'string?',
    voiceRecord: 'string?'
  }
}

export default UserSchema;
