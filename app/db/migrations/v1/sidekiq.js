'use strict';

const SidekiqSchema = {
  name: 'Sidekiq',
  primaryKey: 'paramUuid',
  properties: {
    paramUuid: 'string',
    tableName: 'string',
    version: 'string'
  }
}

export default SidekiqSchema;
