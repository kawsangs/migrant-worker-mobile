import FileDownloader from '../downloaders/file_downloader';
import Question from '../models/Question';

const questionService = (() => {
  return {
    downloadAudioCollection
  }

  function downloadAudioCollection(questions, callback) {
    _downloadAudio(0, questions, callback);
  }

  // private method
  function _downloadAudio(index, questions, callback) {
    if (index == questions.length) {
      !!callback && callback();
      return 
    }

    const question = questions[index]
    if (!question.audio_url) return;

    FileDownloader.download(question.audio_url, function(fileUrl) {
      Question.update(question.id, { audio: fileUrl });
      _downloadAudio(index + 1, questions, callback);
    }, () => !!callback && callback());
  }
})();

export default questionService;