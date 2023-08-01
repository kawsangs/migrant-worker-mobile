import React, { Component } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color } from '../assets/stylesheets/base_style';
import Audio from '../components/Register/Audio';
import BigButtonComponent from '../components/shared/BigButtonComponent';
import RegisterTextInputComponent from '../components/Register/RegisterTextInputComponent';
import BottomSheetModalComponent from '../components/shared/BottomSheetModalComponent';
import RegistrationConfirmationComponent from '../components/shared/RegistrationConfirmationComponent';

import uuidv4 from '../utils/uuidv4';
import registerHelper from '../helpers/register_helper';
import PlaySound from '../components/play_sound';
import SexOption from '../components/sex_option';
import Sidekiq from '../models/Sidekiq';
import { addStatistic } from '../utils/statistic';
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUserAction';
import User from '../models/User';
import styles from '../styles/registerScreenStyle';

const requiredFields = ['uuid', 'name', 'sex', 'age'];

class Register extends Component {
  formError = {};

  constructor(props) {
    super(props);
    let currentUser = props.currentUser || {};
    this.state = {
      uuid: currentUser.uuid || uuidv4(),
      name: currentUser.name,
      sex: currentUser.sex,
      age: currentUser.age,
      voiceRecord: currentUser.voiceRecord || "",
      errors: {},
      isFormValid: false,
      audioPlayer: null,
    };
    this.action = props.route.params.action || "register";
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    this._validateForm()
  }

  _setState(stateName, value) {
    let obj = {};
    obj[stateName] = value;
    this.setState(obj, () => {
      this._validateForm();
    });
  }

  _renderTextInput(item) {
    return <RegisterTextInputComponent
              value={this.state[item.stateName]}
              placeholder={this.props.t("RegisterScreen." + item.placeholder)}
              keyboardType={item.keyboardType}
              iconName={item.iconName}
              onChange={value => this._setState(item.stateName, value)}
              textContainerStyle={registerHelper.validationBorder(this.state[item.stateName], item.stateName, this.state.isFormValid)}
              audio={item.audioFilename}
              audioPlayer={this.state.audioPlayer}
              updateAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
           />
  }

  _buildButtonAudio(audio, active) {
    return (
      <PlaySound
        style={styles.buttonAudioWrapper}
        buttonAudioStyle={{ backgroundColor: active ? Color.white : Color.primary }}
        iconStyle={{ tintColor: active ? Color.primary : Color.white }}
        filePath={audio}
        audioPlayer={this.state.audioPlayer}
        updateMainAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
      />
    )
  }

  _selectGender(value) {
    this.setState({ sex: value }, () => {
      this._validateForm();
    })
  }

  _renderSexOption() {
    return (
      <View style={[{ marginBottom: 24 }, registerHelper.validationBorder(this.state.sex, 'sex', this.state.isFormValid)]}>
        <View style={{ marginBottom: 10, flexDirection: 'row' }}>
          <Text style={{ flex: 1 }}>{this.props.t('RegisterScreen.ChooseGender')}</Text>
          {this._buildButtonAudio('choose_gender.mp3')}
        </View>

        <SexOption
          sex={this.state.sex}
          onPress={(value) => this._selectGender(value)}
        />
      </View>
    )
  }

  _renderSeparator() {
    return (
      <View style={styles.separatorCover}>
        <View style={styles.line} />
        <View style={styles.separatorCoverLabel}>
          <Text style={styles.separatorLabel}>{this.props.t('RegisterScreen.OR')}</Text>
        </View>
        <View style={styles.line} />
      </View>
    )
  }

  _updateVoiceRecord(path) {
    this.setState({ voiceRecord: path }, () => {
      this._validateForm();
    });
  }

  _renderVoiceRecord() {
    return (
      <View style={[styles.voiceRecord, registerHelper.validationBorder(this.state.voiceRecord, 'voice', this.state.isFormValid)]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 4}}>{this.props.t('RegisterScreen.RecordVoice')}</Text>
          <View style={{flex: 1, alignItems: 'flex-end', marginRight: -10}}>
            {this._buildButtonAudio('record_your_voice.mp3')}
          </View>
        </View>
        <Audio
          uuid={this.props.currentUser && this.props.currentUser.uuid }
          callback={(path) => this._updateVoiceRecord(path)}
          audioPath={this.state.voiceRecord}
          audioPlayer={this.state.audioPlayer}
          updateAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
        />
      </View>
    )
  }

  async _submit() {
    if (!this.state.isFormValid)
      return ToastAndroid.show(this.props.t("RegisterScreen.WarningFillRequiredInfo"), ToastAndroid.SHORT);

    User.upsert(this._buildData());
    User.uploadAsync(this.state.uuid);
    try {
      await AsyncStorage.setItem('IS_NEW_SESSION', 'true');
    } catch (e) {
    }

    if (this.action == 'edit') {
      this.props.setCurrentUser(User.find(this.state.uuid));
      this.props.navigation.goBack();
      return;
    }

    this.props.navigation.navigate('WelcomeVideoScreen', { user_uuid: this.state.uuid });
  }

  _buildData() {
    let params = {
      uuid: this.state.uuid,
      name: this.state.name,
      sex: this.state.sex,
      age: this.state.age,
      voiceRecord: this.state.voiceRecord,
    };

    if (this.action == 'register') {
      params.created_at = new Date();
    }

    return params;
  }

  _removeAllErrors() {
    for (let i = 0; i < requiredFields.length; i++) {
      delete this.formError[requiredFields[i]];
    }
  }

  _validateForm() {
    let isValid = false;

    if ((!!this.state.name && !!this.state.sex && !!this.state.age) || !!this.state.voiceRecord)
      isValid = true;

    this.setState({ isFormValid: isValid })
  }

  onConfirmRegister() {
    this.modalRef.current?.dismiss();
    this._submit();
  }

  showConsentForm() {
    this.modalRef.current?.setContent(<RegistrationConfirmationComponent  onPress={() => this.onConfirmRegister()} />);
    this.modalRef.current?.present()
  }

  _renderButtonNext() {
    const button = {
      register: { label: this.props.t("RegisterScreen.ButtonRegister"), audio: 'register.mp3' },
      edit: { label: this.props.t("RegisterScreen.ButtonSave"), audio: 'save.mp3' }
    }
    return <BigButtonComponent
              label={button[this.action].label}
              disabled={!this.state.isFormValid}
              rightComponent={this._buildButtonAudio(button[this.action].audio, true)}
              onPress={() => this.action == 'register' ? this.showConsentForm() : this._submit()}
           />
  }

  render() {
    let list = [
      { stateName: 'name', iconName: 'person', placeholder: 'EnterYourName', audioFilename: 'insert_your_name.mp3' },
      { stateName: 'age', iconName: 'person', placeholder: 'EnterYourAge', audioFilename: 'insert_your_age.mp3', keyboardType: 'number-pad' },
    ]

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {this._renderTextInput(list[0])}
          {this._renderSexOption()}
          {this._renderTextInput(list[1])}
          {this._renderSeparator()}
          {this._renderVoiceRecord()}
          {this._renderButtonNext()}
        </View>
        <BottomSheetModalComponent ref={this.modalRef} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Register));