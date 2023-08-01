import React, { useEffect, useReducer } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { useTranslation } from "react-i18next";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color } from '../../assets/stylesheets/base_style';
import BigButtonComponent from '../shared/BigButtonComponent';
import RegisterTextInputComponent from './RegisterTextInputComponent';
import RegisterVoiceRecorderComponent from './RegisterVoiceRecorderComponent';
import RegistrationConfirmationComponent from '../shared/RegistrationConfirmationComponent';
import SectionSeparatorComponent from '../shared/SectionSeparatorComponent';
import PlaySound from '../play_sound';
import SexOption from '../sex_option';
import uuidv4 from '../../utils/uuidv4';
import styles from '../../styles/registerScreenStyle';
import registerHelper from '../../helpers/register_helper';
import User from '../../models/User';

const RegisterFormComponent = (props) => {
  const { t } = useTranslation();
  const currentUser = props.currentUser || {};
  const [state, setState] = useReducer((prev, next) => {
    return {...prev, ...next}
  }, {
    uuid: props.currentUser.uuid || uuidv4(),
    name: props.currentUser.name,
    sex: props.currentUser.sex,
    age: props.currentUser.age,
    voiceRecord: props.currentUser.voiceRecord || "",
    errors: {},
    isFormValid: false,
    audioPlayer: null,
  })

  useEffect(() => {
    let isValid = false;
    if ((!!state.name && !!state.sex && !!state.age) || !!state.voiceRecord)
      isValid = true;

    setState({ isFormValid: isValid })
  }, [state.name, state.sex, state.age, state.voiceRecord]);

  const updateState = (stateName, value) => {
    let obj = {};
    obj[stateName] = value;
    setState(obj);
  }

  const renderTextInput = (item) => {
    return <RegisterTextInputComponent
              value={state[item.stateName]}
              placeholder={t("RegisterScreen." + item.placeholder)}
              keyboardType={item.keyboardType}
              iconName={item.iconName}
              onChange={value => updateState(item.stateName, value)}
              textContainerStyle={registerHelper.validationBorder(state[item.stateName], item.stateName, state.isFormValid)}
              audio={item.audioFilename}
              audioPlayer={state.audioPlayer}
              updateAudioPlayer={(sound) => setState({ audioPlayer: sound })}
           />
  }

  const renderAudioBtn = (audio, active) => {
    return (
      <PlaySound
        style={styles.buttonAudioWrapper}
        buttonAudioStyle={{ backgroundColor: active ? Color.white : Color.primary }}
        iconStyle={{ tintColor: active ? Color.primary : Color.white }}
        filePath={audio}
        audioPlayer={state.audioPlayer}
        updateMainAudioPlayer={(sound) => setState({ audioPlayer: sound })}
      />
    )
  }

  const renderSexOption = () => {
    return (
      <View style={[{ marginBottom: 24 }, registerHelper.validationBorder(state.sex, 'sex', state.isFormValid)]}>
        <View style={{ marginBottom: 10, flexDirection: 'row' }}>
          <Text style={{ flex: 1 }}>{t('RegisterScreen.ChooseGender')}</Text>
          {renderAudioBtn('choose_gender.mp3')}
        </View>
        <SexOption sex={state.sex} onPress={(value) => setState({sex: value})} />
      </View>
    )
  }

  const renderVoiceRecord = () => {
    return <RegisterVoiceRecorderComponent
              currentUser={currentUser}
              voiceRecord={state.voiceRecord}
              audioPlayer={state.audioPlayer}
              isFormValid={state.isFormValid}
              updateVoiceRecord={(audioPath) => setState({voiceRecord: audioPath})}
              updateAudioPlayer={(audioPlayer) => setState(audioPlayer)}
           />
  }

  const submit = async () => {
    if (!state.isFormValid) return

    User.upsert(_buildData());
    User.uploadAsync(state.uuid);
    try {
      await AsyncStorage.setItem('IS_NEW_SESSION', 'true');
    } catch (e) {
    }

    if (props.action == 'edit') {
      props.setCurrentUser(User.find(state.uuid));
      props.navigation.goBack();
      return;
    }
    props.navigation.navigate('WelcomeVideoScreen', { user_uuid: state.uuid });
  }

  const _buildData = () => {
    let params = {
      uuid: state.uuid,
      name: state.name,
      sex: state.sex,
      age: state.age,
      voiceRecord: state.voiceRecord,
    };
    if (props.action == 'register')
      params.created_at = new Date();

    return params;
  }

  const onConfirmRegister = () => {
    props.modalRef.current?.dismiss();
    submit();
  }

  const showConsentForm = () => {
    props.modalRef.current?.setContent(<RegistrationConfirmationComponent  onPress={() => onConfirmRegister()} />);
    props.modalRef.current?.present()
  }

  const renderButtonNext = () => {
    const button = {
      register: { label: t("RegisterScreen.ButtonRegister"), audio: 'register.mp3' },
      edit: { label: t("RegisterScreen.ButtonSave"), audio: 'save.mp3' }
    }
    return <BigButtonComponent
              label={button[props.action].label}
              disabled={!state.isFormValid}
              rightComponent={renderAudioBtn(button[props.action].audio, true)}
              onPress={() => props.action == 'register' ? showConsentForm() : submit()}
              onDisabledPress={() => ToastAndroid.show(t("RegisterScreen.WarningFillRequiredInfo"), ToastAndroid.SHORT)}
           />
  }

  const list = [
    { stateName: 'name', iconName: 'person', placeholder: 'EnterYourName', audioFilename: 'insert_your_name.mp3' },
    { stateName: 'age', iconName: 'person', placeholder: 'EnterYourAge', audioFilename: 'insert_your_age.mp3', keyboardType: 'number-pad' },
  ]

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {renderTextInput(list[0])}
        {renderSexOption()}
        {renderTextInput(list[1])}
        <SectionSeparatorComponent label={t('RegisterScreen.OR')} />
        {renderVoiceRecord()}
        {renderButtonNext()}
      </View>
    </ScrollView>
  );
}

export default RegisterFormComponent;