import React, {useState} from 'react';

import BigButtonComponent from '../shared/BigButtonComponent';
import PlaySound from '../play_sound';
import Question from '../../models/Question';
import { Color } from '../../assets/stylesheets/base_style';

const {useImperativeHandle} = React;

const SurveyFormButtonComponent = React.forwardRef((props, ref) => {
  const questions = Question.findBySectionId(props.sections[props.currentSection].id);
  const [isValid, setIsValid] = useState(Object.keys(props.answers).length == questions.length);

  useImperativeHandle(ref, () => ({
    validateForm
  }))

  const validateForm = () => {
    setIsValid(Object.keys(props.answers).length == questions.length)
  }

  const renderAudioBtn = () => {
    return (
      <PlaySound
        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 58}}
        buttonAudioStyle={{ backgroundColor: Color.white }}
        iconStyle={{ tintColor: Color.primary }}
        filePath={'next.mp3'}
        audioPlayer={props.audioPlayer}
        updateMainAudioPlayer={(sound) => props.updateAudioPlayer(sound)}
      />
    )
  }

  return <BigButtonComponent
            disabled={!isValid}
            label={props.currentSection != props.sections.length - 1 ? 'បន្ទាប់' : 'បញ្ចប់'}
            buttonStyle={{marginTop: 30}}
            rightComponent={renderAudioBtn()}
            onPress={() => {}}
         />
})

export default SurveyFormButtonComponent;