import FileDownloader from '../downloaders/file_downloader';

const institutionHelper = (() => {
  return {
    isFileDownloaded,
    getDownloadFileName,
    getFilteredInstitutions,
  }

  async function isFileDownloaded(institution, type) {
    const filename = getDownloadFileName(institution, type);
    const isDownloaded = await FileDownloader.isFileExist(filename);

    return isDownloaded;
  }

  function getDownloadFileName(institution, type) {
    const fileUrl = type == 'logo' ? institution.logo_url.split('/') : institution.audio_url.split('/');

    // filename is institution + institution_id + logo_name or audio_name (ex: institution_1_logo.png or institution_1_voice.mp3)
    return `institution_${institution.id}_${fileUrl[fileUrl.length - 1]}`;
  }

  function getFilteredInstitutions(institutions, query) {
    let filteredInstitutions = [];
    const queryText = query.toLowerCase();

    institutions.map(institution => {
      if (_isNameMatch(institution, query))
        filteredInstitutions = institutions.filter( institution =>  _isNameMatch(institution, query));
      else if (_isContactMatch(institution.contacts, queryText))
        filteredInstitutions.push(institution);
    });

    return query === '' ? institutions : filteredInstitutions;
  }

  // private method
  function _isNameMatch(institution, query) {
    return _isStringMatch(institution.name, query) || _isStringMatch(institution.name_km, query);
  }
  
  function _isStringMatch(string, query) {
    const queryText = query.toLowerCase();
    return string.toLowerCase().indexOf(queryText) != -1;
  }

  function _isContactMatch(contacts, query) {
    const contactList = JSON.parse(JSON.stringify(contacts));

    for (let i = 0; i < contactList.length; i++) {
      const contact = JSON.parse(contactList[i]);
      if (_isStringMatch(contact.value, query))
        return true;
    }

    return false;
  }
})();

export default institutionHelper;