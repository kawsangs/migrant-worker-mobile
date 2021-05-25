import helper from './helper';

const schemaV0 = {
  schema: helper.getSchemas([]),
  schemaVersion: 0,
  migration: (oldRealm, newRealm) => {},
};

export default schemaV0;
