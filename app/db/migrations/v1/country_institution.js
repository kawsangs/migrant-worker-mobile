const CountryInstitutionSchema = {
  name: 'CountryInstitution',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    country_code: 'string',
    institution_id: 'int',
  }
}

export default CountryInstitutionSchema;