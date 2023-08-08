import React, {useState} from 'react';
import {View, Text} from 'react-native';

import Questions from '../Questions';
import BigButtonComponent from '../shared/BigButtonComponent';
import PlaySound from '../play_sound';
import { Color } from '../../assets/stylesheets/base_style';

const SurveyFormContentComponent = (props) => {
  const [audioPlayer, setAudioPlayer] = useState(null)

  const renderAudioBtn = () => {
    return (
      <PlaySound
        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 58}}
        buttonAudioStyle={{ backgroundColor: Color.white }}
        iconStyle={{ tintColor: Color.primary }}
        filePath={'next.mp3'}
        audioPlayer={audioPlayer}
        updateMainAudioPlayer={(sound) => setAudioPlayer(sound)}
      />
    )
  }

  const renderFinish = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, paddingBottom: 10}}>
        <View style={{flex: 1}}>
          <Text>Finish message</Text>
        </View>
        <BigButtonComponent
          label='បញ្ចប់'
          rightComponent={renderAudioBtn()}
          onPress={() => props.action == 'register' ? showConsentForm() : submit()}
          onDisabledPress={() => ToastAndroid.show(t("RegisterScreen.WarningFillRequiredInfo"), ToastAndroid.SHORT)}
        />
      </View>
    )
  }

  return (
    <React.Fragment>
      { !!props.currentQuestion && Questions(props.currentQuestion, Color.primary) }
      { !props.currentQuestion && renderFinish() }
      {/* { Questions(props.currentQuestion, Color.primary) }
      { renderFinish() } */}
    </React.Fragment>
  )
}

export default SurveyFormContentComponent;