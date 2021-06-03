const CountryInstitutionSchema = {
  name: 'CountryInstitution',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    country_id: 'int',
    institution_id: 'int',
  }
}

export default CountryInstitutionSchema;