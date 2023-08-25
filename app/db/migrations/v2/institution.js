import Realm from 'realm';
import institutions from '../../../data/json/institutions'

class Institution extends Realm.Object {
  get imageSource() {
    if (!this.logo) { return "" }

    if (this.logo == 'offline') {
      let institution = institutions.filter(institution => institution.id == this.id)[0];
      return !!institution && institution.logo;
    }

    return { uri: `file://${this.logo}` };
  }
}

Institution.schema = {
  name: 'Institution',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    name_km: 'string?',
    address: 'string?',
    logo: 'string?',
    logo_url: 'string?',
    audio: 'string?',
    audio_url: 'string?',
    contacts: { type: 'list', objectType: 'string' }
  }
}

export default Institution;
