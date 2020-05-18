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
import PlaySound from '../components/play_sound';
import SexOption from '../components/sex_option';
import Sidekiq from '../utils/sidekiq';

const requiredFields = ['uuid', 'name', 'sex', 'age', 'phoneNumber'];

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

  _renderTextInput(item) {
    return (
      <View style={{marginBottom: 24}}>
        <View style={styles.textInputWrapper}>
          <Icon name={item.iconName} size={24} style={{position: 'absolute', top: 14, left: 10}} />
          <TextInput
            placeholder={item.placeholder}
            style={styles.textInput}
            keyboardType={item.keyboardType || 'default'}
            onChangeText={value => this._setState(item.stateName, value)}
            value={ this.state[item.stateName] }
          />

          { this._buildButtonAudio(item.audioFilename) }
        </View>

        { !!this.state.errors[item.stateName] && <Text style={styles.errorText}>{this.state.errors[item.stateName]}</Text> }
      </View>
    )
  }

  _buildButtonAudio(audioFilename) {
    return (
      <PlaySound
        style={styles.buttonAudioWrapper}
        fileName={audioFilename || 'register'}
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

    for(let i=0; i<fields.length; i++) {
      obj[fields[i]] = this.state[fields[i]];
    }
    obj.created_at = new Date();

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
        <Text style={styles.buttonNextText}>រក្សាទុក</Text>
      </TouchableOpacity>
    )
  }

  render() {
    let list = [
      { stateName: 'name', iconName: 'person', placeholder: 'បំពេញឈ្មោះ', audioFilename: '' },
      { stateName: 'age', iconName: 'person', placeholder: 'បំពេញអាយុ', audioFilename: '', keyboardType: 'number-pad' },
      { stateName: 'phoneNumber', iconName: 'phone', placeholder: 'លេខទូរស័ព្ទ', audioFilename: '', keyboardType: 'phone-pad' },
    ]

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            { this._renderTextInput(list[0]) }
            { this._renderSexOption() }
            { this._renderTextInput(list[1]) }
            { this._renderTextInput(list[2]) }
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
