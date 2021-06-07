const CountrySchema = {
  name: 'Country',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    emoji_flag: 'string'
  }
}

export default CountrySchema
