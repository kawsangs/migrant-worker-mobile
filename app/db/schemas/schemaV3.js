import Institution from '../migrations/v3/institution'
import helper from './helper';

const changedSchemas = [
  { label: 'Institution', data: Institution },
];


const schemaV3 = {
  schema: helper.getSchemas(changedSchemas),
  schemaVersion: 3,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 3) {
      const oldObjects = oldRealm.objects('Institution');
      const newObjects = newRealm.objects('Institution');

      for (let i = 0; i< oldObjects.length; i++) {
        newObjects[i].display_order = !oldObjects[i].display_order ? null : oldObjects[i].display_order;
      }
    }
  },
};

export default schemaV3;
