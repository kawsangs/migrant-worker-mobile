import Institution from '../migrations/v2/institution'
import helper from './helper';
import InstitutionService from '../../services/institution_service';

const changedSchemas = [
  { label: 'Institution', data: Institution },
];


const schemaV2 = {
  schema: helper.getSchemas(changedSchemas),
  schemaVersion: 2,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects('Institution');
      const newObjects = newRealm.objects('Institution');

      for (let i = 0; i< oldObjects.length; i++) {
        newObjects[i].name_km = !oldObjects[i].name_km ? new InstitutionService().getNameKhmer(oldObjects[i].id) : oldObjects[i].name_km;
      }
    }
  },
};

export default schemaV2;
