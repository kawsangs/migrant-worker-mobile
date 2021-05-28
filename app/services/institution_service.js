import Institution from '../models/Institution';
import { Api } from '../utils/api';
import {reject, contains, map} from 'underscore';

const InstitutionService = (() => {
  return {
    fetch
  }

  function fetch(countryId) {
    return Api.get(`/countries/${countryId}/country_institutions`)
      .then(response => response.data)
      .then(data => {
        const newInstitutions = reject(data, d => contains(existingIds(), d.institution.id))
        // alert( JSON.stringify(newInstitutions) )
        Institution.createBatch(newInstitutions)
        // upsert to realm & download assets
        return newInstitutions.length
      })
      .catch( err => {
        alert(err); 
        return 0; 
      })
  }

  function existingIds() {
    return map(Institution.all(), i => i.id)
  }
})()

export default InstitutionService
