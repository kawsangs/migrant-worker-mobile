const CountrySchema = {
  name: 'Country',
  primaryKey: 'code',
  properties: {
    code: 'string',
    id: 'int',
    name: 'string',
    emoji_flag: 'string',
  }
}

export default CountrySchema
