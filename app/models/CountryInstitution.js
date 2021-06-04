import realm from '../db/schema'

const MODEL_NAME = 'CountryInstitution';

const CountryInstitution = (() => {
  return {
    findByCountryId,
    create,
    isExist,
  }

  function findByCountryId(countryId) {
    return realm.objects(MODEL_NAME).filtered(`country_id = ${countryId}`);
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL_NAME, data);
    });
  }

  function isExist(countryId, institutionId) {
    return realm.objects(MODEL_NAME).filtered(`country_id = ${countryId} AND institution_id = ${institutionId}`)[0];
  }
})();

export default CountryInstitution;