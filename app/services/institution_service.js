import Institution from '../models/Institution';
import Country from '../models/Country';
import { Api } from '../utils/api';
import {reject, contains, map} from 'underscore';
import FileDownloader from '../downloaders/file_downloader'

const InstitutionService = (() => {
  return {
    fetch,
    getInstitutionByCountry
  }

  function fetch(countryId, successCallback, errorCallback) {
    return Api.get(`/countries/${countryId}/country_institutions`)
      .then(response => response.data)
      .then((data) => {
        console.log('fetch data === ', data);
        successCallback(data);

        // if institution is exist update the info in realm
        // if institution is not exist -> add it to realm
        // download the audio if the institution doesn't have the audio downloaded yet
        // download the audio -> update the audio_url with the audio file path -> update state to audio_downloaded = true
      })
      .catch( err => {
        alert(err); 
        errorCallback(err);
      })
  }

  function getInstitutionByCountry(countryInstitutions) {
    let institutions = [];

    countryInstitutions.map(countryInstitution => {
      institutions.push(Institution.find(countryInstitution.institution_id));
    });

    return institutions;
  }

  // private function

  function downloadAsset(institution, callback) {
    if( institution.logo_url != undefined ) {
      const logoUrl = institution.logo_url.split('/');
      const logoName = `institution_${institution.id}_${logoUrl[logoUrl.length - 1]}`;       // filename is institution + institution_id + logo_name (ex: institution_1_logo.png)

      FileDownloader.download(logoName, institution.logo_url, async function(fileUrl) {
        callback(fileUrl);
      }),
      () => { alert('error') }
    }
  }

  function existingIds() {
    return map(Institution.all(), i => i.id)
  }

  function _getInstitutions(data) {
    let institutions = [];

    data.map(item => {
      institutions.push(item.institution);
    });

    return institutions;
  }

  function _updateLogoUrl(institutions) {
    institutions.map((institution, index) => {
      const savedInstitution = Institution.find(institution.id);
      institutions[index].logo_url = savedInstitution.logo_url;
    })

    return institutions;
  }
})()

export default InstitutionService
