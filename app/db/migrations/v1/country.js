const CountrySchema = {
  name: 'Country',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    emoji_flag: 'string',
    institutions: 'Institution[]'
  }
}

export default CountrySchema
