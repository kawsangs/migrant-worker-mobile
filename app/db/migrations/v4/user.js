'use strict';

const UserSchema = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'int?',
    name: 'string?',
    sex: 'string?',
    age: 'string?',
    phoneNumber: 'string?',
    voiceRecord: 'string?',
    created_at: 'date'
  }
}

export default UserSchema;
