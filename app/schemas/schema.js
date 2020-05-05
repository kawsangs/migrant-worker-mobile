// https://stackoverflow.com/questions/40195371/how-to-organize-react-native-with-realm-project-files
// https://github.com/realm/realm-js/blob/master/examples/ReactExample/components/todo-app.js

'use strict';

import Realm from 'realm';
import UserSchema from './user';
import PdfSchema from './pdf';
import SidekiqSchema from './sidekiq';

const schema = [
  UserSchema,
  PdfSchema,
  SidekiqSchema
];

const schemas = [
  { schema: schema, schemaVersion: 0 }
]

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
