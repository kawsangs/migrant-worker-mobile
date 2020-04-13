import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Button, Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';

export default class Home extends React.Component {
  state = {};

  _goTo(screenName) {
    this.props.navigation.navigate(screenName);
  }

  _renderButton(title, icon, option={}) {
    let textColor = option.active ? '#fff' : Color.primary;
    let buttonColor = option.active ? Color.primary : '#fff';

    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => this._goTo(option.screenName)}
          style={[styles.buttonTextWrapper, {backgroundColor: buttonColor}]}
        >
          <Icon name={icon} color={textColor} size={24} />
          <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
        </TouchableOpacity>

        <PlaySound
          style={styles.buttonAudioWrapper}
          fileName={option.audioFileName}
          activePlaying={this.state.activePlaying}
          onPress={(fileName) => this.setState({activePlaying: fileName})}/>
      </View>
    )
  }

  _renderButtonAbout() {
    return (
      <TouchableOpacity
        onPress={() => this._goTo('AboutScreen')}
        style={styles.buttonAboutWrapper}
      >
        <Icon name='info' size={24} />
        <Text style={{marginLeft: 10}}>អំពីកម្មវិធី</Text>
      </TouchableOpacity>
    )
  }

  _renderHeader() {
    return (
      <View style={styles.imageWrapper}>
        <Image style={{width: 301, height: 198}} source={require('../assets/images/travel.png')} />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        { this._renderHeader() }

        <View style={styles.container}>
          <Text style={styles.title}>ចំណាកស្រុកឆ្លាតវៃ</Text>
          <Text>កម្មវិធីចំណាកស្រុកឆ្លាតវៃ</Text>
          <Text>ជាកម្មវិធីទូរស័ព្ទបង្កើតឡើងក្នុងគោលបំណងជំនួយ</Text>

          <View style={{marginTop: 30}}>
            { this._renderButton('ចំណាកស្រុកឆ្លាតវៃ', 'info-outline', {screenName: 'OtherInfoScreen', audioFileName: 'safe_migration', active: true}) }
            { this._renderButton('ទាក់ទងទៅលេខ ១២៨០', 'phone', {screenName: 'ChcScreen', audioFileName: 'contact_1280'}) }
            { this._renderButton('ចុះឈ្មោះ', 'person', {screenName: 'RegisterScreen', audioFileName: 'register'}) }

            { this._renderButtonAbout() }
          </View>
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
  imageWrapper: {
    height: 210,
    backgroundColor: Color.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    fontFamily: FontFamily.title,
    fontSize: FontSize.title,
    textAlign: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginBottom: 16
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    flex: 1,
    padding: 16,
    marginRight: 10,
    borderRadius: 10
  },
  buttonText: {
    marginLeft: 10,
    fontFamily: FontFamily.title
  },
  buttonAudioWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonAboutWrapper: {
    flexDirection: 'row',
    flex: 1,
    padding: 16,
    marginRight: 10,
    justifyContent: 'center'
  }
});
