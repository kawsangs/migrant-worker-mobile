'use strict';

const Notification = {
  name: 'Notification',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'int?',
    title: 'string',
    content: 'string',
    received_date: { type: 'date', optional: true },
    is_read: { type: 'bool', default: false },
    data: 'string?'
  }
};

export default Notification;