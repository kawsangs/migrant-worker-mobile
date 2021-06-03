import realm from '../db/schema'

const MODEL_NAME = 'CountryInstitution';

const CountryInstitution = (() => {
  return {
    findByCountryId,
    create,
  }

  function findByCountryId(countryId) {
    return realm.objects(MODEL_NAME).filtered(`country_id = ${countryId}`);
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL_NAME, data);
    });
  }
})();

export default CountryInstitution;