import Institution from '../models/Institution';
import Country from '../models/Country';
import { Api } from '../utils/api';
import {reject, contains, map} from 'underscore';
import FileDownloader from '../downloaders/file_downloader'

const InstitutionService = (() => {
  return {
    fetch
  }

  function fetch(countryId, successCallback, errorCallback) {
    return Api.get(`/countries/${countryId}/country_institutions`)
      .then(response => response.data)
      .then((data) => {
        let institutions = _getInstitutions(data);
        const filteredInstitutions = reject(data, d => contains(existingIds(), d.institution.id));

        if (filteredInstitutions.length == 0) {
          institutions = _updateLogoUrl(institutions);

          Country.update(countryId, { institutions: institutions });
          successCallback(institutions);
        }

        filteredInstitutions.map(async (filteredInstitution, index) => {
          const institution = filteredInstitution.institution;

          await downloadAsset(institution, (fileUrl) => {
            institution['logo_url'] = fileUrl;
            institution['country_id'] = parseInt(countryId);

            Institution.update(institution.id, institution);

            if (index == filteredInstitutions.length - 1) {
              setTimeout(() => {
                institutions = _updateLogoUrl(institutions);
                Country.update(countryId, { institutions: institutions });

                successCallback(institutions);
              }, 1000);
            }
          });
        });
      })
      .catch( err => {
        alert(err); 
        errorCallback(err);
      })
  }

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
