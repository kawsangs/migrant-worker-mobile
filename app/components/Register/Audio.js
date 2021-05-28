import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import uuidv4 from '../../utils/uuidv4';
import * as Progress from 'react-native-progress';
import { Color, Style } from '../../assets/stylesheets/base_style';

export default class Audio extends Component {
  constructor(props) {
    super(props);

    let audioPath = props.audioPath || (AudioUtils.DocumentDirectoryPath + '/' + props.uuid + '.aac');

    this.state = {
      currentTime: 0.0,
      recording: false,
      finished: false,
      isPlaying: false,
      hasPermission: undefined,
      audioPath: audioPath,
      visiblePlayButton: false,
      visibleProgressBar: false
    }

    this.limitTime = 60;
  }

  componentWillUnmount() {
    if (!!this.sound) {
      this.sound.stop();
      this.sound.release();
    }
  }

  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });
    });

    this._handleRenderingPlayButton();
  }

  _handleRenderingPlayButton() {
    if(!!this.props.audioPath) {
      this.sound = new Sound(this.props.audioPath, '', (error) => {
        if (error) {
          return console.log('failed to load the sound', error);
        }

        let seconds = Math.ceil(this.sound.getDuration());
        this.setState({visiblePlayButton: true, currentTime: seconds});
      });
    }
  }

  _onProgress = (data) => {
    let seconds = Math.floor(data.currentTime)
    this.setState({currentTime: seconds});

    if (seconds == this.limitTime) {
      this._stop();
    }
  }

  _prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'ការអនុញ្ញាតប្ើរមីក្រូហ្វូន',
      'message': 'កម្មវិធីនេះ សុំសិទ្ធិចូលប្រើមីក្រូហ្វូនរបស់អ្នក ដូច្នេះទើបអ្នកអាចថតសំលេង។'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({ isPlaying: false, recording: false });

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
        this._onSaveRecord();
      }

    } catch (error) {
      console.error(error);
    }
  }

  async _stopPlaying() {
    this.sound.stop();
    this.setState({isPlaying: false});
  }

  async _play() {
    this.setState({isPlaying: true});

    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      this.sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        this.sound.play((success) => {
          if (success) {
            this.setState({isPlaying: false});
          } else {
            this.sound.reset();
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    this._prepareRecordingPath(this.state.audioPath);
    AudioRecorder.onProgress = this._onProgress;

    this.setState({recording: true});

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed });
  }

  _handleRecording = () => {
    this._showProgressBar();
    this._record();
  }

  _showProgressBar() {
    this.setState({
      visibleProgressBar: true,
      visiblePlayButton: false
    });
  }

  _onPress() {
    this.setState({showHint: true})
    let self = this;
    setTimeout(function() {
      self.setState({showHint: false});
    }, 3000);
  }

  _onLongPress() {
    this.setState({showHint: false});
    this.longPress = true;
    this._handleRecording();
  }

  _onPressOut() {
    if(!this.longPress) { return }

    this.longPress = false
    this._stop();
  }

  _renderButtonMicrophone() {
    if (this.state.visiblePlayButton) {
      return;
    }

    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        { this.state.showHint && <Text style={styles.hint}>ចុចនិងសង្កត់ដើម្បីថតសំលេង</Text> }

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => this._onPress()}
          onLongPress={() => this._onLongPress()}
          onPressOut={() => this._onPressOut()}
        >
          <AwesomeIcon name={'microphone'} color='#fff' size={36} />
        </TouchableOpacity>
      </View>
    )
  }

  _onSaveRecord() {
    this.setState({
      visibleProgressBar: false,
      visiblePlayButton: true
    });

    this.props.callback(this.state.audioPath);
  }

  _onDeleteRecord() {
    this.setState({
      visiblePlayButton: false
    })

    this.props.callback('');
  }

  _renderProgressBar() {
    return (
      <View style={{marginTop: 20}}>
        <Progress.Bar progress={this.state.currentTime / this.limitTime} width={null} color={Color.primary} unfilledColor='rgb(216, 216, 216)' borderColor='transparent' />
        <Text style={[styles.progressText, {textAlign: 'center'}]}>{this._renderTime() }</Text>
      </View>
    )
  }

  _renderTime() {
    let date = new Date(null);
    date.setSeconds(this.state.currentTime);
    let time = date.toISOString().substr(11, 8);

    return time;
  }

  _handlePlaying() {
    if (this.state.isPlaying) {
      return this._stopPlaying();
    }
    this._play();
  }

  _renderButtonPlay() {
    return (
      <View style={[Style.boxShadow, {marginTop: 13, marginHorizontal: 0, flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderRadius: 8}]}>
        <TouchableOpacity onPress={() => this._handlePlaying()}>
          { this.state.isPlaying &&
            <MaterialIcon style={styles.icon} name='pause-circle-filled' size={48} color={Color.delete}/>
          }
          {
            !this.state.isPlaying &&
            <MaterialIcon style={styles.icon} name='play-circle-filled' size={48} color={Color.primary}/>
          }
        </TouchableOpacity>

        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text>លេង</Text>
          <Text>{ this._renderTime() }</Text>
        </View>

        <TouchableOpacity onPress={ () => this._onDeleteRecord() }>
          <MaterialIcon style={styles.icon} name='delete' size={40} color='rgb(228, 74, 74)'/>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{height: 180}}>
        { this.state.visiblePlayButton && this._renderButtonPlay() }
        { this.state.visibleProgressBar && this._renderProgressBar() }

        <View style={{flex: 1}}></View>
        <View style={styles.controls}>
          { this._renderButtonMicrophone() }
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  progressText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    padding: Platform.OS === 'ios' ? 15 : 20,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: Color.primary
  },
  icon: {
    height: 50,
    lineHeight: 50
  },
  hint: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 4
  }
});
