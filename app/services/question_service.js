import FileDownloader from '../downloaders/file_downloader';
import Question from '../models/Question';

const questionService = (() => {
  return {
    downloadAudioCollection
  }

  function downloadAudioCollection(questions) {
    _downloadAudio(0, questions);
  }

  // private method
  function _downloadAudio(index, questions) {
    if (index == questions.length)
      return;

    const question = questions[index]
    if (!question.audio_url) return;

    FileDownloader.download(question.audio_url, function(fileUrl) {
      Question.update(question.id, { audio: fileUrl });
      _downloadAudio(index + 1, questions);
    });
  }
})();

export default questionService;