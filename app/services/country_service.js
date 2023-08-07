import Country from '../models/Country';
import webService from '../services/web_service';
import {reject, contains, map} from 'underscore';

const CountryService = (() => {
  return {
    fetch
  }

  function fetch() {
    webService.get('/countries')
      .then(res => JSON.parse(res.data))
      .then(data => {
        const newCountries = reject(data, c => contains(existingCodes(), c.id))
        Country.createBatch(newCountries)
        // upsert to realm & download assets
      })
  }

  function existingCodes() {
    return map(Country.all(), c => c.code)
  }

  
})()


export default CountryService
