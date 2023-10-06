import DeviceInfo from 'react-native-device-info';

import WebService from './web_service';
import questionService from './question_service';
import endpointHelper from '../helpers/endpoint_helper';
import Form from '../models/Form';
import Section from '../models/Section';
import Question from '../models/Question';
import Quiz from '../models/Quiz';
import Criteria from '../models/Criteria';
import Answer from '../models/Answer';
import uuidv4 from '../utils/uuidv4';
import surveyLogicUtil from '../utils/survey_logic_util';

const OPERATORS = {
  'AND': '&&',
  'OR': '||',
}

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

  isQuestionMatchCriterias(question, answers, currentSection) {
    const criterias = Criteria.byQuestion(question.id);
    if (criterias.length == 0)
      return true;

    let queries = [];
    criterias.map((criteria, index) => {
      let matchedAnswer = null;
      for (let section in answers) {
        if (Object.keys(answers[section]).length == 0 || section > currentSection)
          break;

        for (let answerIndex in answers[section]) {
          if (answers[section][answerIndex].question_code == criteria.question_code) {
            matchedAnswer = answers[section][answerIndex];
            if (criteria.operator == 'in')
              query = surveyLogicUtil.getMatchAnyQuery(matchedAnswer.value, criteria.response_value);
            else if (criteria.operator == 'match_all')
              query = surveyLogicUtil.getMatchAllQuery(matchedAnswer.value, criteria.response_value);
            else
              query = `('${matchedAnswer.value}' ${criteria.operator == '=' ? '==' : criteria.operator} '${criteria.response_value}')`;

            queries.push(query)
            break;
          }
        }
      }
    });

    if (queries.length < criterias.length && question.relevant == "AND")   // when there is no answer to compare with the criteria then mark it as false (for AND condition only)
      queries.push('false')

    let mainQuery = ''
    queries.map((qu, index) => {
      mainQuery += `${qu} ${index < queries.length - 1 ? OPERATORS[question.relevant] : ''}`
    })

    if (eval(mainQuery))
      return true

    return false
  }

  // private method
  _saveForm(data) {
    const questionCount = data.sections.reduce((totalCount, item) => totalCount + item.questions.length, 0);
    Form.upsert({...data, question_count: questionCount, type: 'survey'}, DeviceInfo.getVersion(), false)
  }

  _saveSectionsAndQuestions(sections, formId, callback) {
    sections.map(section => {
      Section.upsert({ id: section.id, name: section.name, form_id: formId, display_order: section.display_order });
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