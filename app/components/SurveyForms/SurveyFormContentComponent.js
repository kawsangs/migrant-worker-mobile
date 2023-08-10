import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Questions from '../Questions';
import AppIcon from '../AppIcon';
import AlertMessage from '../AlertMessage';
import BigButtonComponent from '../shared/BigButtonComponent';
import PlaySound from '../play_sound';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import Quiz from '../../models/Quiz';

const SurveyFormContentComponent = (props) => {
  const navigation = useNavigation();
  const currentQuiz = useSelector(state => state.currentQuiz)
  const currentIndex = useSelector(state => state.currentQuestionIndex)
  const [audioPlayer, setAudioPlayer] = useState(null)
  const [alertVisible, setAlertVisible] = useState(false);

  navigation.setOptions({
    headerLeft: () => (<HeaderBackButton tintColor={"#fff"} onPress={() =>handleBack()}/>)
  });

  const handleBack = () => {
    if (currentIndex > -1)
      return setAlertVisible(true);

    navigation.goBack()
  }

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
    Quiz.setFinished(currentQuiz.uuid);

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, paddingBottom: 10}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AppIcon iconType='survey' customStyles={{width: wp('45%'), height: wp('45%'), marginBottom: 20, marginTop: -30}} />
          <Text>អរគុណសម្រាប់ការឆ្លើយសំណួរនៃការស្ទង់មតិ។</Text>
          <Text>សូមចុចប៊ូតុង <Text style={{fontFamily: FontFamily.title}}>"បញ្ចប់"</Text> ដើម្បីចាក់ចេញ។</Text>
        </View>
        <BigButtonComponent
          label='បញ្ចប់'
          rightComponent={renderAudioBtn()}
          onPress={() => navigation.reset({index: 0, routes: [{ name: 'HomeScreen' }]})}
          onDisabledPress={() => ToastAndroid.show(t("RegisterScreen.WarningFillRequiredInfo"), ToastAndroid.SHORT)}
        />
      </View>
    )
  }

  const existSurvey = () => {
    setAlertVisible(false);
    navigation.goBack();
  }

  return (
    <React.Fragment>
      { !!props.currentQuestion && Questions(props.currentQuestion, Color.primary) }
      { !props.currentQuestion && renderFinish() }
      <AlertMessage
        show={alertVisible}
        warning={false}
        title={"ចាកចេញពីការស្ទង់មតិ"}
        message={"តើអ្នក​ពិតជា​ចង់​ចាកចេញ​ពី​ការស្ទង់​មតិ​នេះ​មែន​ទេ?"}
        onPressAction={() => existSurvey()}
        onPressCancel={() => setAlertVisible(false)}
        audio={"exit_game.mp3"}
        hideAudio={true}
      />
    </React.Fragment>
  )
}

export default SurveyFormContentComponent;