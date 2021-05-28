import Institution from '../models/Institution';
import { Api } from '../utils/api';
import {reject, contains, map} from 'underscore';
import FileDownloader from '../downloaders/file_downloader'

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
        const batches = Institution.createBatch(newInstitutions)
        batches.forEach(downloadAsset)

        return newInstitutions.length
      })
      .catch( err => {
        alert(err); 
        return 0; 
      })
  }

  function downloadAsset(institution) {
    if( institution.logoUrl != undefined ) {
      FileDownloader.download(institution.logoName, institution.logoUrl, function(fileUrl) {
        alert(`success download ${fileUrl}`)
        // realm.write(() => { institution.logo_url = fileUrl })
      }),
      () => { alert('error') }
    }
  }

  function existingIds() {
    return map(Institution.all(), i => i.id)
  }
})()

export default InstitutionService
