import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from "react-i18next";

import PlaySound from '../play_sound';
import Audio from './Audio';
import styles from '../../styles/registerScreenStyle';
import registerHelper from '../../helpers/register_helper';
import { Color } from '../../assets/stylesheets/base_style';

const RegisterVoiceRecorderComponent = (props) => {
  const { t } = useTranslation();
  const renderAudioBtn = () => {
    return (
      <PlaySound
        style={styles.buttonAudioWrapper}
        buttonAudioStyle={{ backgroundColor: Color.primary }}
        iconStyle={{ tintColor: Color.white }}
        filePath={'record_your_voice.mp3'}
        audioPlayer={props.audioPlayer}
        updateMainAudioPlayer={(sound) => props.updateAudioPlayer(sound)}
      />
    )
  }

  return (
    <View style={[styles.voiceRecord, registerHelper.validationBorder(props.voiceRecord, 'voice', props.isFormValid)]}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 4}}>{t('RegisterScreen.RecordVoice')}</Text>
        <View style={{flex: 1, alignItems: 'flex-end', marginRight: -10}}>
          {renderAudioBtn()}
        </View>
      </View>
      <Audio
        uuid={props.currentUser && props.currentUser.uuid }
        callback={(path) => props.updateVoiceRecord(path)}
        audioPath={props.voiceRecord}
        audioPlayer={props.audioPlayer}
        updateAudioPlayer={(sound) => props.updateAudioPlayer(sound)}
      />
    </View>
  )
}

export default RegisterVoiceRecorderComponent;