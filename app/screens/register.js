import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import Audio from '../components/Register/Audio';

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
    return (
      <View style={{
        marginBottom: 16
      }}>
        <View style={[styles.buttonWrapper, Style.boxShadow]}>
          <View style={[styles.textInputWrapper, registerHelper.validationBorder(this.state[item.stateName], item.stateName, this.state.isFormValid)]}>
            <Icon name={item.iconName} size={24} style={styles.inputIcon} />
            <TextInput
              placeholder={this.props.t("RegisterScreen." + item.placeholder)}
              style={styles.textInput}
              keyboardType={item.keyboardType || 'default'}
              onChangeText={value => this._setState(item.stateName, value)}
              value={this.state[item.stateName]}
            />

            {this._buildButtonAudio(item.audioFilename)}
          </View>
        </View>
      </View>
    )
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

  _renderButtonNext() {
    const button = {
      register: { label: this.props.t("RegisterScreen.ButtonRegister"), audio: 'register.mp3' },
      edit: { label: this.props.t("RegisterScreen.ButtonSave"), audio: 'save.mp3' }
    }

    return (
      <TouchableOpacity
        onPress={() => this._submit()}
        style={[styles.buttonNext, !this.state.isFormValid ? { backgroundColor: Color.gray } : {}]}
      >
        <View style={{ width: 58 }} />
        <View style={styles.coverRegisterLabel}>
          <Text style={[styles.buttonNextText, !this.state.isFormValid ? { color: 'black' } : {}]}>{button[this.action].label}</Text>
        </View>
        {this._buildButtonAudio(button[this.action].audio, true)}
      </TouchableOpacity>
    )
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
    flexDirection: 'column'
  },
  buttonWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderColor: Color.border,
  },
  buttonAudioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
  },
  textInputWrapper: {
    flexDirection: 'row'
  },
  textInput: {
    height: 52,
    paddingLeft: 38,
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.body
  },
  buttonNext: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    flexDirection: 'row'
  },
  buttonNextText: {
    color: Color.white,
    fontFamily: FontFamily.title,
  },
  errorText: {
    color: Color.errorText,
    fontSize: 12
  },
  inputIcon: {
    position: 'absolute',
    top: 14,
    left: 10
  },
  separatorCover: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Color.border
  },
  separatorLabel: {
    fontWeight: '700',
    color: Color.gray
  },
  separatorCoverLabel: {
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginBottom: 5
  },
  voiceRecord: {
    backgroundColor: Color.white,
    minHeight: 105,
    borderWidth: 1,
    borderColor: Color.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginBottom: 34,
  },
  coverRegisterLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

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
