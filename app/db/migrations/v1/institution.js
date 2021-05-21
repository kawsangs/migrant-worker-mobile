const InstitutionSchema = {
  name: 'Institution',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    kind: 'string',
    address: 'string?',
    logo_url: 'string?',
    audio_url: 'string?',
    contacts: { type: 'list', objectType: 'Contact' }
  }
}

export default InstitutionSchema;
