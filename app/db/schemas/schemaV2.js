import helper from './helper';
import CountrySchema from '../migrations/v2/country';

const schemaV2 = {
  schema: helper.getSchemas([
    {label: "Country", data: CountrySchema}
  ]),
  schemaVersion: 2,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects('Country');
      const newObjects = newRealm.objects('Country');

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].code = !oldObjects[i].code ? null : oldObjects[i].code;
      }
    }
  },
};

export default schemaV2;
