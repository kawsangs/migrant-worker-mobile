import institutions from '../../../data/json/institutions'

class Institution {
  get logoSource() {
    let institution = institutions.find(({ institution }) => institution.id == this.id)
    return institution && institution.institution.logo
  }
}

Institution.schema = {
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

export default Institution;
