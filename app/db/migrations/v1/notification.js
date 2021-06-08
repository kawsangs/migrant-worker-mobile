'use strict';

const Notification = {
  name: 'notification',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    title: 'string',
    content: 'string',
    image: 'string?',
    received_date: { type: 'date', optional: true },
    is_read: { type: 'bool', default: false }
  }
};

export default Notification;