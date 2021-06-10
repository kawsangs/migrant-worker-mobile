import helper from './helper';

const schemaV1 = {
  schema: helper.getSchemas([]),
  schemaVersion: 1,
  // migration: (oldRealm, newRealm) => {},
  deleteRealmIfMigrationNeeded: true,
};

export default schemaV1;
