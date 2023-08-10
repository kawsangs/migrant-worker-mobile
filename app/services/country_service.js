import Country from '../models/Country';
import WebService from '../services/web_service';
import {reject, contains, map} from 'underscore';
import endpointHelper from '../helpers/endpoint_helper';

class CountryService extends WebService {
  fetch() {
    this.get(endpointHelper.listingEndpoint('/countries'))
      .then(res => JSON.parse(res.data))
      .then(data => {
        const newCountries = reject(data, c => contains(this._existingCodes(), c.id))
        Country.createBatch(newCountries)
        // upsert to realm & download assets
      })
  }

  // private method
  _existingCodes() {
    return map(Country.all(), c => c.code)
  }
}

export default CountryService
