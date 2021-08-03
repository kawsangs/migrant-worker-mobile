import realm from '../db/schema'

const MODEL_NAME = 'CountryInstitution';

const CountryInstitution = (() => {
  return {
    findByCountryCode,
    create,
    isExist,
    deleteBatch,
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
    return realm.objects(MODEL_NAME).filtered(`country_code = '${countryCode}' AND institution_id = ${institutionId}`)[0];
  }

  function deleteBatch() {
    realm.write(() => {
      realm.delete(realm.objects(MODEL_NAME))
    })
  }
})();

export default CountryInstitution;