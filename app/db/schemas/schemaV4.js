import Institution from '../migrations/v3/institution'
import Video from '../migrations/v4/video'
import helper from './helper';

const changedSchemas = [
  { label: 'Institution', data: Institution },
  { label: 'Video', data: Video }
];

const schemaV4 = {
  schema: helper.getSchemas(changedSchemas),
  schemaVersion: 4,
  migration: (oldRealm, newRealm) => {
  }
}

export default schemaV4;