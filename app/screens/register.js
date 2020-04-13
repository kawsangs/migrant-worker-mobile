import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';

import { ThemeContext, getTheme } from 'react-native-material-ui';
import { StatusBar } from 'react-native';
import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import Audio from '../components/audio';
import Toast, { DURATION } from 'react-native-easy-toast';
import realm from '../schemas/schema';
import uuidv4 from '../utils/uuidv4';
import UserWorker from '../workers/user_worker';
import PlaySound from '../components/play_sound';
import SexOption from '../components/sex_option';

export default class Register extends React.Component {
  state = {
    uuid: uuidv4(),
    name: '',
    sex: '',
    age: '',
    phoneNumber: '',
    voiceRecord: '',
    errors: {}
  };

  formError = {};

  _setState(stateName, value) {
    let obj = {};
    obj[stateName] = value;
    this.setState(obj);
  }

  _renderTextInput(stateName, iconName, option={}) {
    return (
      <View style={{marginBottom: 24}}>
        <View style={styles.textInputWrapper}>
          <Icon name={iconName} size={24} style={{position: 'absolute', top: 14, left: 10}} />
          <TextInput
            placeholder={option.placeholder}
            style={styles.textInput}
            onChangeText={value => this._setState(stateName, value)}
            value={ this.state[stateName] }
          />

          { this._buildButtonAudio(option.audioFileName) }
        </View>

        { !!this.state.errors[stateName] && <Text style={styles.errorText}>{this.state.errors[stateName]}</Text> }
      </View>
    )
  }

  _buildButtonAudio(fileName) {
    return (
      <PlaySound
        style={styles.buttonAudioWrapper}
        fileName={fileName}
        activePlaying={this.state.activePlaying}
        onPress={(fileName) => this.setState({activePlaying: fileName})}/>
    )
  }

  _renderSexOption() {
    return (
      <View style={{marginBottom: 24}}>
        <View style={{marginBottom: 10, flexDirection: 'row'}}>
          <Text style={{flex: 1}}>ជ្រើសរើសភេទ</Text>
          { this._buildButtonAudio('register') }
        </View>

        <SexOption
          sex={this.state.sex}
          onPress={(value) => this.setState({sex: value})}
        />

        { !!this.state.errors.sex && <Text style={styles.errorText}>{this.state.errors.sex}</Text> }
     </View>
    )
  }

  _renderVoiceRecord() {
    return (
      <View style={{minHeight: 155, borderWidth: 1, borderColor: Color.border, borderRadius: 8, padding: 8, marginBottom: 34}}>
        <Text>ចុះឈ្មោះជាសំលេង</Text>

        <Audio
          callback={(path) => this.setState({voiceRecord: path})}
          audioPath={ this.state.voiceRecord }/>
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
        UserWorker.performAsync(this.state.uuid);
        this.props.navigation.navigate('ChcScreen');
      });
    } catch (e) {
      alert(e);
    }
  }

  _buildData() {
    let fields = ['uuid', 'name', 'sex', 'age', 'phoneNumber', 'voiceRecord'];
    let obj = {};

    for(let i=0; i<fields.length; i++) {
      obj[fields[i]] = this.state[fields[i]];
    }

    return obj;
  }

  _checkRequire(field) {
    let value = this.state[field];

    if ( value == null || !value.length) {
      this.formError[field] = ["មិនអាចទទេបានទេ"];
    } else {
      delete this.formError[field];
    }

    this.setState({errors: this.formError})
  }

  _removeAllErrors() {
    let fields = ['name', 'sex', 'age', 'phoneNumber'];

    for (let i = 0; i < fields.length; i++) {
      delete this.formError[fields[i]];
    }
  }

  _isFormValid() {
    if (this.state.voiceRecord.length) {
      this._removeAllErrors();
      return true;
    }

    let fields = ['name', 'sex', 'age', 'phoneNumber'];

    for (let i = 0; i < fields.length; i++) {
      this._checkRequire(fields[i]);
    }

    return Object.keys(this.formError).length == 0;
  }

  _renderButtonNext() {
    return (
      <TouchableOpacity
        onPress={() => this._submit()}
        style={styles.buttonNext}
      >
        <Text style={styles.buttonNextText}>រក្សាទុក</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            { this._renderTextInput('name', 'person', { placeholder: 'បំពេញឈ្មោះ', audioFileName: 'register' }) }
            { this._renderSexOption() }
            { this._renderTextInput('age', 'person', { placeholder: 'បំពេញអាយុ', audioFileName: 'register' }) }
            { this._renderTextInput('phoneNumber', 'phone', { placeholder: 'លេខទូរស័ព្ទ', audioFileName: 'register' }) }
            { this._renderVoiceRecord() }
            { this._renderButtonNext() }
          </View>
        </ScrollView>

        <Toast ref='toast' position='top' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
    flexDirection: 'column'
  },
  buttonAudioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 58
  },
  textInputWrapper: {
    flexDirection: 'row'
  },
  textInput: {
    height: 52,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.border,
    paddingLeft: 38,
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.body
  },
  buttonNext: {
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary
  },
  buttonNextText: {
    color: '#fff',
    fontFamily: FontFamily.title
  },
  errorText: {
    color: Color.errorText,
    fontSize: 12
  },
});
