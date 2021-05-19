const ContactSchema = {
  name: 'Contact',
  primaryKey: 'id',
  properties: {
    id: 'int',
    type: 'string',
    value: 'string'
  }
}

export default ContactSchema;