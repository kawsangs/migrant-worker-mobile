import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import ButtonNav from '../components/button_nav';
import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';
import Sound from 'react-native-sound';

export default class ProfileCard extends React.Component {
  state = {};

  componentWillUnmount() {
    if (!!this.sound) {
      this.sound.stop();
      this.sound.release();
    }
  }

  componentDidMount() {
    if (!this.props.user.voiceRecord) { return }

    this.sound = new Sound(this.props.user.voiceRecord, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }

      let date = new Date(null);
      date.setSeconds(Math.ceil(this.sound.getDuration()));
      let time = date.toISOString().substr(11, 8);

      this.setState({time: time});
    });
  }

  async _play() {
    this.setState({isPlaying: true});

    setTimeout(() => {
      this.sound.play((success) => {
        if (success) {
          this.setState({isPlaying: false});
        } else {
          this.sound.reset();
        }
      });
    }, 100);
  }

  async _stop() {
    this.sound.stop();
    this.setState({isPlaying: false});
  }

  _handlePlaying() {
    if (this.state.isPlaying) {
      return this._stop();
    }
    this._play();
  }

  _renderButtonPlay() {
    let iconName = this.state.isPlaying ? 'pause-circle-filled' : 'play-circle-filled';
    let iconColor = this.state.isPlaying ? '#e94b35' : Color.primary;

    return (
      <View style={styles.buttonPlay}>
        <TouchableOpacity onPress={() => this._handlePlaying() }>
          <Icon
            style={{height: 52, lineHeight: 52}}
            name={iconName} size={50} color={iconColor}/>
        </TouchableOpacity>

        <View style={{flexDirection: 'column', marginLeft: 8}}>
          <Text style={{fontFamily: FontFamily.title}}>លេង</Text>
          <Text>{this.state.time}</Text>
        </View>
      </View>
    )
  }

  _renderNoVoice() {
    return (
      <View style={styles.buttonNoVoice}>
        <Text>មិនមានសាជាសំលេង</Text>
      </View>
    )
  }

  _renderInfo() {
    return (
      <View style={{marginLeft: 14, flex: 1}}>
        <Text style={{fontFamily: FontFamily.title}}>{this.props.user.name || '-'}</Text>

        { !!this.props.user.age &&
          <View style={{flexDirection: 'row'}}>
            <Icon name='person' size={24} />
            <Text style={{marginLeft: 10}}>អាយុ: {this.props.user.age}</Text>
          </View>
        }

        { !!this.props.user.phoneNumber &&
          <View style={{flexDirection: 'row'}}>
            <Icon name='phone' size={24} />
            <Text style={{marginLeft: 10}}>{this.props.user.phoneNumber}</Text>
          </View>
        }
      </View>
    );
  }

  render() {
    let image = this.props.user.sex || 'other';

    return (
      <View>
        <View style={styles.card}>
          <View style={styles.profileWrapper}>
            <View style={styles.avata}>
              <Image source={Images[image]} style={{width: 52, height: 52}} />
            </View>

            { this._renderInfo() }
          </View>

          { !!this.props.user.voiceRecord && this._renderButtonPlay() }
          { !this.props.user.voiceRecord && this._renderNoVoice() }
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16
  },
  profileWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#efefef',
    marginBottom: 14,
    paddingBottom: 14
  },
  avata: {
    width: 72,
    height: 72,
    backgroundColor: '#edeff8',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonPlay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 8,
    paddingLeft: 8
  },
  buttonNoVoice: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    alignItems: 'center',
    height: 56,
    justifyContent: 'center'
  }
});
