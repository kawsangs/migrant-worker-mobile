import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import Audio from '../components/audio';
import Toast, { DURATION } from 'react-native-easy-toast';
import realm from '../schemas/schema';
import uuidv4 from '../utils/uuidv4';
import PlaySound from '../components/play_sound';
import SexOption from '../components/sex_option';
import Sidekiq from '../utils/sidekiq';
import { addStatistic } from '../utils/statistic';
import color from '../assets/stylesheets/base/color';
import style from '../assets/stylesheets/base/style';

const requiredFields = ['uuid', 'name', 'sex', 'age'];

export default class Register extends React.Component {
  state = {
    uuid: uuidv4(),
    name: '',
    sex: '',
    age: '',
    voiceRecord: '',
    errors: {}
  };

  formError = {};

  _setState(stateName, value) {
    let obj = {};
    obj[stateName] = value;
    this.setState(obj);
  }

  _renderTextInput(item) {
    return (
      <View style={{
        marginBottom: 16
      }}>
        <View style={[styles.buttonWrapper, Style.boxShadow]}>
          <View style={styles.textInputWrapper}>
            <Icon name={item.iconName} size={24} style={styles.inputIcon} />
            <TextInput
              placeholder={item.placeholder}
              style={styles.textInput}
              keyboardType={item.keyboardType || 'default'}
              onChangeText={value => this._setState(item.stateName, value)}
              value={this.state[item.stateName]}
            />

            {this._buildButtonAudio(item.audioFilename)}
          </View>
        </View>

        {!!this.state.errors[item.stateName] && <Text style={styles.errorText}>{this.state.errors[item.stateName]}</Text>}
      </View>
    )
  }

  _buildButtonAudio(audioFilename, active) {
    return (
      <PlaySound
        style={styles.buttonAudioWrapper}
        buttonAudioStyle={{ backgroundColor: active ? color.white : color.primary }}
        iconStyle={{ tintColor: active ? color.primary : color.white }}
        fileName={audioFilename || 'register'}
        activePlaying={this.state.activePlaying}
        onPress={(fileName) => this.setState({ activePlaying: fileName })} />
    )
  }

  _renderSexOption() {
    return (
      <View style={{ marginBottom: 24 }}>
        <View style={{ marginBottom: 10, flexDirection: 'row' }}>
          <Text style={{ flex: 1 }}>Choose Gender</Text>
          {this._buildButtonAudio('register')}
        </View>

        <SexOption
          sex={this.state.sex}
          onPress={(value) => this.setState({ sex: value })}
        />

        { !!this.state.errors.sex && <Text style={styles.errorText}>{this.state.errors.sex}</Text>}
      </View>
    )
  }

  _renderSeparator() {
    return (
      <View style={styles.separatorCover}>
        <View style={styles.line} />
        <View style={styles.separatorCoverLabel}>
          <Text style={styles.separatorLabel}>OR</Text>
        </View>
        <View style={styles.line} />
      </View>
    )
  }

  _renderVoiceRecord() {
    return (
      <View style={styles.voiceRecord}>
        <Text>Record voice</Text>
        <Audio
          callback={(path) => this.setState({ voiceRecord: path })}
          audioPath={this.state.voiceRecord} />
      </View>
    )
  }

  _submit() {
    if (!this._isFormValid()) {
      return this.refs.toast.show('សូមបំពេញព័ត៌មានជាមុនសិន...!', DURATION.SHORT);
    }

    try {
      realm.write(() => {
        realm.create('User', this._buildData(), true);
        addStatistic('registerSuccess');
        Sidekiq.createUser(this.state.uuid);
        this.props.navigation.navigate('ProfileListScreen');
      });
    } catch (e) {
      alert(e);
    }
  }

  _buildData() {
    let fields = requiredFields.concat(['voiceRecord']);
    let obj = {};

    for (let i = 0; i < fields.length; i++) {
      obj[fields[i]] = this.state[fields[i]];
    }
    obj.created_at = new Date();

    return obj;
  }

  _checkRequire(field) {
    let value = this.state[field];

    if (value == null || !value.length) {
      this.formError[field] = ["មិនអាចទទេបានទេ"];
    } else {
      delete this.formError[field];
    }

    this.setState({ errors: this.formError })
  }

  _removeAllErrors() {
    for (let i = 0; i < requiredFields.length; i++) {
      delete this.formError[requiredFields[i]];
    }
  }

  _isFormValid() {
    if (this.state.voiceRecord.length) {
      this._removeAllErrors();
      return true;
    }

    for (let i = 0; i < requiredFields.length; i++) {
      this._checkRequire(requiredFields[i]);
    }

    return Object.keys(this.formError).length == 0;
  }

  _renderButtonNext() {
    return (
      <TouchableOpacity
        onPress={() => this._submit()}
        style={styles.buttonNext}
      >
        <View style={{ width: 58 }} />
        <View style={styles.coverRegisterLabel}>
          <Text style={styles.buttonNextText}>Register</Text>
        </View>
        {this._buildButtonAudio('register', true)}
      </TouchableOpacity>
    )
  }

  render() {
    let list = [
      { stateName: 'name', iconName: 'person', placeholder: 'Enter your name', audioFilename: '' },
      { stateName: 'age', iconName: 'person', placeholder: 'Enter your age', audioFilename: '', keyboardType: 'number-pad' },
    ]

    return (
      <View style={{ flex: 1 }}>
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

        <Toast ref='toast' position='top' positionValue={Platform.OS == 'ios' ? 120 : 140} />
      </View>
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
    color: color.white,
    fontFamily: FontFamily.title,
    fontWeight: '700'
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
    backgroundColor: color.border
  },
  separatorLabel: {
    fontWeight: '700',
    color: color.gray
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
