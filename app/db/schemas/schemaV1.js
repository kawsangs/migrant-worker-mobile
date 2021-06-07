import helper from './helper';

const schemaV0 = {
  schema: helper.getSchemas([]),
  schemaVersion: 1,
  // migration: (oldRealm, newRealm) => {},
  deleteRealmIfMigrationNeeded: true,
};

export default schemaV0;
