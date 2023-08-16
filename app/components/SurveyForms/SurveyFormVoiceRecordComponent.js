import React, { useState } from 'react';;
import {Text, View} from 'react-native';
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
      voice: audioPath || ''
    }
    props.updateAnswer(answerParams);
  }

  return (
    <View style={{padding: 16, marginTop: 16, borderWidth: 1.5, borderColor: '#dbdbdb', borderRadius: 10}}>
      {/* { !!voice && props.renderTitle()} */}
      { props.renderTitle()}
      <Audio
        uuid={uuidv4()}
        callback={(path) => onVoiceChange(path)}
        audioPath={voice}
        audioPlayer={props.audioPlayer}
        updateAudioPlayer={(sound) => props.updateAudioPlayer(sound)}
        containerStyle={{height: 140}}
        // progressBarContainerStyle={{marginTop: 16}}
      />
      {/* { !voice &&
        <View style={{marginTop: 12, justifyContent: 'center'}}>
          { props.renderTitle() }
        </View>
      } */}
    </View>
  )
}

export default SurveyFormVoiceRecordComponent;