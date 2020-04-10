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
import SoundPlayer from 'react-native-sound-player';
import Images from '../utils/images';
import Audio from '../components/audio';
import Toast, { DURATION } from 'react-native-easy-toast';
import realm from '../schemas/schema';
import uuidv4 from '../utils/uuidv4';
import UserWorker from '../workers/user_worker';

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

  audioFileNames = ['register'];
  _onFinishedPlayingSubscription = null;
  formError = {};

  componentDidMount() {
    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      this._setStateStopPlaying();
    })
  }

  componentWillUnmount() {
    this._onFinishedPlayingSubscription.remove()
  }

  _playAudio(audioFileName) {
    if(!audioFileName) {
      return;
    }
    this._setStateStopPlaying();
    let obj = {};
    obj['playing' + audioFileName] = true;

    this.setState(obj);
    SoundPlayer.playSoundFile(audioFileName, 'mp3')
  }

  _setStateStopPlaying() {
    let obj = {}

    for(let i=0; i < this.audioFileNames.length; i++) {
      obj['playing' + this.audioFileNames[i]] = false;
    }

    this.setState(obj);
  }

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

  _buildButtonAudio(audioFileName) {
    return (
      <TouchableOpacity
        onPress={() => this._playAudio(audioFileName) }
        style={styles.buttonAudioWrapper}
      >
        <View style={styles.buttonAudio}>
          { !this.state['playing' + 'register'] && <Icon name="volume-up" color='#fff' size={24} />}
          { this.state['playing' + 'register'] && <Icon name="play-circle-outline" color='#fff' size={24} />}
        </View>
      </TouchableOpacity>
    )
  }

  _buildOption(title, value, imageName) {
    let borderStyle = this.state.sex == value ? { borderColor: Color.primary } : {};
    let textFont = this.state.sex == value ? FontFamily.title : FontFamily.body;
    let textColor = this.state.sex == value ? Color.primary : Color.textBlack;

    return (
      <TouchableOpacity
        onPress={() => this.setState({sex: value}) }
        style={[styles.card, Style.boxShadow, borderStyle]}>

        <Image source={Images[imageName]} style={{width: 52, height: 52}} />
        <Text style={{fontFamily: textFont, color: textColor}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  _renderSexOption() {
    return (
      <View style={{marginBottom: 24}}>
        <View style={{marginBottom: 10, flexDirection: 'row'}}>
          <Text style={{flex: 1}}>ជ្រើសរើសភេទ</Text>
          { this._buildButtonAudio('register') }
        </View>

        <View style={styles.cardWrapper}>
          { this._buildOption('ប្រុស', 'male', 'male') }
          <View style={{width: 24}}></View>
          { this._buildOption('ស្រី', 'female', 'female') }
          <View style={{width: 24}}></View>
          { this._buildOption('ផ្សេងៗ', 'other', 'other') }
        </View>

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
  buttonAudio: {
    backgroundColor: Color.primary,
    borderRadius: 18,
    width: 36,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  cardWrapper: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    height: 110,
    borderRadius: 8,
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
