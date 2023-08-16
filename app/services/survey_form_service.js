import DeviceInfo from 'react-native-device-info';

import WebService from './web_service';
import questionService from './question_service';
import endpointHelper from '../helpers/endpoint_helper';
import Form from '../models/Form';
import Section from '../models/Section';
import Question from '../models/Question';
import Quiz from '../models/Quiz';
import Answer from '../models/Answer';
import uuidv4 from '../utils/uuidv4';

class SurveyFormService extends WebService {
  constructor() {
    super();
  }

  findAndSave(id, callback) {
    this.get(endpointHelper.detailEndpoint('survey_forms', id))
      .then(response => JSON.parse(response.data))
      .then(data => {
        this._saveForm(data);
        this._saveSectionsAndQuestions(data.sections, id, callback);
      })
      .catch(error => console.log('survey form error = ', error))
  }

  submitSurvey(answers, quizUuid) {
    this._saveAnswer(answers, () => {
      Quiz.setFinished(quizUuid);
    });
  }

  // private method
  _saveForm(data) {
    const questionCount = data.sections.reduce((totalCount, item) => totalCount + item.questions.length, 0);
    Form.upsert({...data, question_count: questionCount, type: 'survey'}, DeviceInfo.getVersion(), false)
  }

  _saveSectionsAndQuestions(sections, formId, callback) {
    sections.map(section => {
      Section.upsert({ id: section.id, name: section.name, form_id: formId });
      const questions = section.questions.map(question => ({ ...question, form_id: formId }));
      Question.upsertCollection(questions);
    });
    questionService.downloadAudioCollection(sections, callback);
  }

  _saveAnswer(answers, callback) {
    const sections = Object.keys(answers);
    sections.map(section => {
      for (let key in answers[section]) {
        Answer.upsert({...answers[section][key], uuid: uuidv4()})
      }
    })
    !!callback && callback();
  }
}

export default SurveyFormService;