import React, {useEffect, useRef, useState} from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from 'react-redux';

import Audio from './Audio';
import styles from '../../styles/registerScreenStyle';
import registerHelper from '../../helpers/register_helper';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

const RegisterVoiceRecorderComponent = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [audioPlayer, setAudioPlayer] = useState(null);
  const currentPlayingAudio = useSelector(state => state.currentPlayingAudio);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!!currentPlayingAudio && !!audioPlayer) {
      audioRef.current?._stopPlaying();
      setAudioPlayer(null);
    }
  }, [currentPlayingAudio])

  return (
    <View style={[styles.voiceRecord, registerHelper.validationBorder(props.voiceRecord, 'voice', props.isFormValid)]}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 4}}>{t('RegisterScreen.RecordVoice')}</Text>
        <View style={{flex: 1, alignItems: 'flex-end', marginRight: -14, marginTop: 2}}>
          {props.audioButton()}
        </View>
      </View>
      <Audio
        ref={audioRef}
        uuid={props.currentUser && props.currentUser.uuid }
        callback={(path) => props.updateVoiceRecord(path)}
        audioPath={props.voiceRecord}
        audioPlayer={audioPlayer}
        updateAudioPlayer={(sound) => {
          dispatch(setCurrentPlayingAudio(null));
          setAudioPlayer(sound);
        }}
      />
    </View>
  )
}

export default RegisterVoiceRecorderComponent;