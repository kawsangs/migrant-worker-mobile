import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import SurveyFormSelectOneComponent from './SurveyFormSelectOneComponent';
// import Questions from '../Questions';
import Section from '../../models/Section';
import Question from '../../models/Question';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import uuidv4 from '../../utils/uuidv4';

const Questions = {
  SelectOne: SurveyFormSelectOneComponent,
};

const SurveyFormQuestionsComponent = (props) => {
  const sections = Section.findByFormId(props.formId)
  const currentSection = sections[0].id
  const [questions, setQuestions] = useState(Question.findBySectionId(sections[0].id))

  console.log('=== QQQ = ', questions.length)

  // useEffect(() => {

  // }, [sections]);

  const renderOption = () => {

  }

  const renderQuestions = (sectionId) => {
    return questions.map(question => {
      const type = question.type.split('::')[1];
      console.log('type = ', type)

      return (
        <View key={question.id} style={{padding: 16, margin: 16, borderWidth: 1.5, borderColor: '#dbdbdb', borderRadius: 10}}>
          <Text>{question.name}</Text>
          { typeof Questions[type] !== 'undefined' &&
            React.createElement(Questions[type], {
              key: uuidv4(),
              question: question,
              buttonColor: Color.primary,
              statisticPrefix: 'Survey',
            })
          }

          {/* {
            React.createElement(SurveyFormSelectOneComponent, {
              key: uuidv4(),
              question: question,
              buttonColor: Color.primary,
              statisticPrefix: 'Survey',
            })
          } */}
        </View>
      )
    })
  }

  return (
    <View style={{flex: 1}}>
      <Text>Questions</Text>
      {renderQuestions()}
    </View>
  )
}

export default SurveyFormQuestionsComponent;