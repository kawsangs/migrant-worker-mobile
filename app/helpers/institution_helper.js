import FileDownloader from '../downloaders/file_downloader';

const institutionHelper = (() => {
  return {
    isFileDownloaded,
    getDownloadFileName,
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
})();

export default institutionHelper;