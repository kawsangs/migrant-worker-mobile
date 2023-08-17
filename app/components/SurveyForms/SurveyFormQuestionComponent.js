import React from 'react';
import {View, Text} from 'react-native';

import SurveyFormSelectOneComponent from './SurveyFormSelectOneComponent';
import SurveyFormSelectMultipleComponent from './SurveyFormSelectMultipleComponent';
import SurveyFormTextComponent from './SurveyFormTextComponent';
import SurveyFormVoiceRecordComponent from './SurveyFormVoiceRecordComponent';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import uuidv4 from '../../utils/uuidv4';
import Option from '../../models/Option';

const SurveyFormQuestionComponent = (props) => {
  const type = props.question.type.split('::')[1];

  const QuestionComponents = {
    SelectOne: SurveyFormSelectOneComponent,
    SelectMultiple: SurveyFormSelectMultipleComponent,
    Text: SurveyFormTextComponent,
    VoiceRecording: SurveyFormVoiceRecordComponent,
  };

  const renderTitle = () => {
    return <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 1, fontFamily: FontFamily.title}}>{props.question.name}</Text>
              <View style={{marginLeft: 4}}>
                <CustomAudioPlayerComponent
                  itemUuid={props.question.id}
                  audio={!!props.question.audio ? {uri: props.question.audio} : null}
                  buttonStyle={{backgroundColor: !!props.question.audio ? Color.primary : Color.gray}}
                  iconStyle={{color: 'white'}}
                  rippled={true}
                />
              </View>
           </View>
  }

  const renderQuestion = () => {
    if (typeof QuestionComponents[type] !== 'undefined') {
      return React.createElement(QuestionComponents[type], {
                key: uuidv4(),
                question: props.question,
                options: Option.byQuestion(props.question.id),
                buttonColor: Color.primary,
                statisticPrefix: 'Survey',
                updateAnswer: (answer) => props.updateAnswers(answer),
            })
    }
  }

  return (
    <View style={{padding: 16, marginTop: 16, borderWidth: 1.5, borderColor: '#dbdbdb', borderRadius: 10, backgroundColor: Color.white}}>
      { renderTitle() }
      { renderQuestion() }
    </View>
  )
}

export default SurveyFormQuestionComponent;