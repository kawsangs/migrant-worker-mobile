import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Audio from '../Register/Audio';
import uuidv4 from '../../utils/uuidv4';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

const SurveyFormVoiceRecordComponent = (props) => {
  const [voice, setVoice] = useState('');
  const [audioPlayer, setAudioPlayer] = useState(null)
  const currentUser = useSelector(state => state.currentUser)
  const currentQuiz = useSelector(state => state.currentQuiz)
  const currentPlayingAudio = useSelector(state => state.currentPlayingAudio)
  const dispatch = useDispatch();
  const audioRef = React.createRef()

  useEffect(() => {
    if (!!currentPlayingAudio && !!audioPlayer) {
      audioRef.current?._stopPlaying();
      setAudioPlayer(null)
    }
  }, [currentPlayingAudio])

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

  const updateAudioPlayer = (sound) => {
    dispatch(setCurrentPlayingAudio(null));
    setAudioPlayer(sound);
  }

  return <Audio
            ref={audioRef}
            uuid={uuidv4()}
            callback={(path) => onVoiceChange(path)}
            audioPath={voice}
            audioPlayer={audioPlayer}
            updateAudioPlayer={(sound) => updateAudioPlayer(sound)}
            containerStyle={{height: 140}}
            buttonPlayStyle={{marginTop: 40}}
         />
}

export default SurveyFormVoiceRecordComponent;