import Institution from '../models/Institution';
import CountryInstitution from '../models/CountryInstitution';
import FileDownloader from '../downloaders/file_downloader'
import uuidv4 from '../utils/uuidv4';
import institutionHelper from '../helpers/institution_helper';
import endpointHelper from '../helpers/endpoint_helper';
import WebService from '../services/web_service';

import RNFS from 'react-native-fs';

import institutions from '../data/json/institutions'

class InstitutionService extends WebService {
  constructor() {
    super();
    _this = this;
  }

  fetch(countryCode, successCallback, errorCallback) {
    this.get(endpointHelper.listingNestedEndpoint('countries', countryCode, 'country_institutions'))
      .then(res => JSON.parse(res.data))
      .then(data => {
        const prevCountryInstitutions = CountryInstitution.findByCountryCode(countryCode);
        prevCountryInstitutions.map(prevCountryInstitution => {
          Institution.deleteItem(Institution.find(prevCountryInstitution.institution_id));
        })
        CountryInstitution.deleteByCountryCode(countryCode);
        data.map((item, index) => {
          let institution = item.institution;
          Institution.create(institution, index);
          const countryInstitutionData = {
            uuid: uuidv4(),
            country_code: countryCode,
            institution_id: institution.id
          };
          CountryInstitution.create(countryInstitutionData);
          this._downloadFile(institution);
        });

        setTimeout(() => {
          successCallback(this._getInstitutions(countryCode))
        }, 1500);
      })
      .catch(error => errorCallback(error))
  }

  getInstitutionByCountry(countryInstitutions) {
    let institutions = [];

    countryInstitutions.map(countryInstitution => {
      institutions.push(Institution.find(countryInstitution.institution_id));
    });

    return institutions.sort((a, b) => a.display_order > b.display_order);
  }

  getNameKhmer(id) {
    const institution = institutions.filter(item => item.id == id);

    if (institution.length > 0)
      return institution[0].name_km;

    return '';
  }

  // private function
  async _downloadAsset(institution, type) {
    const isFileDownloaded = await institutionHelper.isFileDownloaded(institution, type)
    const fileName = institutionHelper.getDownloadFileName(institution, type);

    if (!isFileDownloaded) {
      const filePath = type == 'logo' ? institution.logo_url : institution.audio_url;
      FileDownloader.download(filePath, async function(fileUrl) {
        _this._updateFileUrl(institution, type, fileUrl);
      }),
      () => { console.log('error download file') }
    }
    else {
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      _this._updateFileUrl(institution, type, filePath);
    }
  }

  _updateFileUrl(institution, type, filePath) {
    const params = type == 'logo' ? { logo: filePath } : { audio: filePath };
    Institution.update(institution.id, params);
  }

  _getInstitutions(countryCode) {
    const countryInstitutions = CountryInstitution.findByCountryCode(countryCode);

    return this.getInstitutionByCountry(countryInstitutions)
  }

  _downloadFile(institution) {
    if (institution.logo_url)
      _this._downloadAsset(institution, 'logo');
    if (institution.audio_url)
      _this._downloadAsset(institution, 'audio');
  }
}

export default InstitutionService
