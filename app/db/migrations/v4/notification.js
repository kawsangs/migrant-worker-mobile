'use strict';

const Notification = {
  name: 'Notification',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    title: 'string',
    content: 'string',
    received_date: { type: 'date', optional: true },
    is_read: { type: 'bool', default: false },
    data: 'string?'
  }
};

export default Notification;