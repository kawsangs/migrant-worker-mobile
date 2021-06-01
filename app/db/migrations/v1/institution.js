import institutions from '../../../data/json/institutions'

class Institution {
  get logoSource() {
    let institution = institutions.find(({ institution }) => institution.id == this.id)
    return institution && institution.institution.logo
  }

  get logoName() {
    return this.logoUrl ? this.logoUrl.split(/\//g).pop() : '';
  }

  get logoUrl() {
    return this.logo_url;
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
