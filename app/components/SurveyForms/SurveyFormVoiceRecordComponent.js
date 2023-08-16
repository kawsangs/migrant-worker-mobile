import React, { useState } from 'react';;
import {useSelector} from 'react-redux';

import Audio from '../Register/Audio';
import uuidv4 from '../../utils/uuidv4';

const SurveyFormVoiceRecordComponent = (props) => {
  const [voice, setVoice] = useState('');
  const currentUser = useSelector(state => state.currentUser)
  const currentQuiz = useSelector(state => state.currentQuiz)

  const onVoiceChange = (audioPath) => {
    setVoice(audioPath);
    if (!audioPath) return props.updateAnswer(null);

    const answerParams = {
      question_id: props.question.id,
      question_code: props.question.code,
      user_uuid: currentUser.uuid,
      quiz_uuid: currentQuiz.uuid,
      value: audioPath || '',
      voice: audioPath || ''
    }
    props.updateAnswer(answerParams);
  }

  return <Audio
            uuid={uuidv4()}
            callback={(path) => onVoiceChange(path)}
            audioPath={voice}
            audioPlayer={props.audioPlayer}
            updateAudioPlayer={(sound) => props.updateAudioPlayer(sound)}
            containerStyle={{height: 140}}
         />
}

export default SurveyFormVoiceRecordComponent;