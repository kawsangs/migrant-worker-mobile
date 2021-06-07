import Country from '../models/Country';
import { Api } from '../utils/api';
import {reject, contains, map} from 'underscore';

const CountryService = (() => {
  return {
    fetch
  }

  function fetch() {
    return Api.get('/countries')
      .then(response => response.data)
      .then(data => {
        const newCountries = reject(data, c => contains(existingCodes(), c.id))
        // alert( JSON.stringify(newCountries) )
        Country.createBatch(newCountries)
        // upsert to realm & download assets
        return newCountries.length
      })
      .catch( err => {
        return 0; 
      })
  }

  function existingCodes() {
    return map(Country.all(), c => c.code)
  }

  
})()


export default CountryService
