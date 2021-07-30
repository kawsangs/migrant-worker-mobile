import Institution from '../models/Institution';
import CountryInstitution from '../models/CountryInstitution';
import { Api } from '../utils/api';
import FileDownloader from '../downloaders/file_downloader'
import uuidv4 from '../utils/uuidv4';
import institutionHelper from '../helpers/institution_helper';

import RNFS from 'react-native-fs';

import institutions from '../data/json/institutions'

const InstitutionService = (() => {
  return {
    fetch,
    getInstitutionByCountry,
    getNameKhmer,
  }

  function fetch(countryCode, successCallback, errorCallback) {
    return Api.get(`/countries/${countryCode}/country_institutions`)
      .then(response => response.data)
      .then((data) => {
        data.map(item => {
          let institution = item.institution;

          if (Institution.isExist(institution.id)) {
            // If institution is exist in realm -> update the existing data
            let contacts = [];
            institution.contacts.map(contact => {
              contacts.push(JSON.stringify(contact))
            });

            institution.contacts = contacts;
            Institution.update(institution.id, institution);

            if (!CountryInstitution.isExist(countryCode, institution.id)) {
              const params = {
                uuid: uuidv4(),
                country_code: countryCode,
                institution_id: institution.id
              };
              CountryInstitution.create(params);
            }
          }
          else {
            // If institution is not exist in realm -> create new record in realm
            Institution.create(institution);

            const countryInstitutionData = {
              uuid: uuidv4(),
              country_code: countryCode,
              institution_id: institution.id
            };
            CountryInstitution.create(countryInstitutionData);
          }

          _downloadFile(institution);
        });

        setTimeout(() => {
          successCallback(_getInstitutions(countryCode))
        }, 1500);
      })
      .catch( err => {
        errorCallback(err);
      })
  }

  function getInstitutionByCountry(countryInstitutions) {
    let institutions = [];

    countryInstitutions.map(countryInstitution => {
      institutions.push(Institution.find(countryInstitution.institution_id));
    });

    // return institutions;
    return institutions.sort((a, b) => a.id > b.id);
  }

  function getNameKhmer(id) {
    const institution = institutions.filter(item => item.id == id);

    if (institution.length > 0)
      return institution[0].name_km;

    return '';
  }

  // private function

  async function downloadAsset(institution, type) {
    const isFileDownloaded = await institutionHelper.isFileDownloaded(institution, type)
    const fileName = institutionHelper.getDownloadFileName(institution, type);

    if (!isFileDownloaded) {
      const filePath = type == 'logo' ? institution.logo_url : institution.audio_url;

      FileDownloader.download(fileName, filePath, async function(fileUrl) {
        _updateFileUrl(institution, type, fileUrl);
      }),
      () => { console.log('error download file') }
    }
    else {
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      _updateFileUrl(institution, type, filePath);
    }
  }

  function _updateFileUrl(institution, type, filePath) {
    const params = type == 'logo' ? { logo: filePath } : { audio: filePath };
    Institution.update(institution.id, params);
  }

  function _getInstitutions(countryCode) {
    const countryInstitutions = CountryInstitution.findByCountryCode(countryCode);

    return getInstitutionByCountry(countryInstitutions)
  }

  function _downloadFile(institution) {
    if (institution.logo_url)
      downloadAsset(institution, 'logo');
    if (institution.audio_url)
      downloadAsset(institution, 'audio');
  }
})()

export default InstitutionService
