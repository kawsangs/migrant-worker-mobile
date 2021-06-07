import realm from '../db/schema'

const MODEL_NAME = 'CountryInstitution';

const CountryInstitution = (() => {
  return {
    findByCountryCode,
    create,
    isExist,
  }

  function findByCountryCode(countryCode) {
    return realm.objects(MODEL_NAME).filtered(`country_code = '${countryCode}'`);
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL_NAME, data);
    });
  }

  function isExist(countryCode, institutionId) {
    return realm.objects(MODEL_NAME).filtered(`country_code = ${countryCode} AND institution_id = ${institutionId}`)[0];
  }
})();

export default CountryInstitution;