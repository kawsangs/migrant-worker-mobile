import React, {useState} from 'react';
import {View} from 'react-native';

import BigButtonComponent from '../shared/BigButtonComponent';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';
import Question from '../../models/Question';
import { Color } from '../../assets/stylesheets/base_style';

const {useImperativeHandle} = React;

const BUTTONS = {
  next: {label: 'បន្ទាប់', audio: 'next.mp3'},
  finish: {label: 'បញ្ចប់', audio: null}
}

const SurveyFormButtonComponent = React.forwardRef((props, ref) => {
  const [isValid, setIsValid] = useState(false);

  useImperativeHandle(ref, () => ({
    validateForm
  }))

  const validateForm = (currentSection) => {
    const questions = Question.findBySectionId(props.sections[currentSection].id);
    setIsValid(Object.keys(props.answers[currentSection]).length == questions.length)
  }

  const renderAudioBtn = () => {
    return <CustomAudioPlayerComponent
              itemUuid='btn-next-audio'
              audio={props.currentSection != props.sections.length - 1 ? BUTTONS.next.audio : BUTTONS.finish.audio}
              buttonStyle={{borderColor: Color.white}}
              iconStyle={{color: Color.white}}
              isOutline={true}
           />
  }

  return <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
            <BigButtonComponent
              disabled={!isValid}
              label={props.currentSection != props.sections.length - 1 ? BUTTONS.next.label : BUTTONS.finish.label}
              buttonStyle={{paddingRight: 16}}
              rightComponent={renderAudioBtn()}
              onPress={() => props.onPress()}
            />
         </View>
})

export default SurveyFormButtonComponent;