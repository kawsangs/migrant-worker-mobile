'use strict';

import Realm from 'realm';

import schemaV0 from './schemas/schemaV0';

const schemas = [
  schemaV0,
];

// the first schema to update to is the current schema version
// since the first schema in our array is at
let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
if (nextSchemaIndex !== -1) {
  while (nextSchemaIndex < schemas.length) {
    const migratedRealm = new Realm(schemas[nextSchemaIndex++]);
    migratedRealm.close();
  }
}

Realm.open(schemas[schemas.length-1]);

export default new Realm(schemas[schemas.length-1]);
