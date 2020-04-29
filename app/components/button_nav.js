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
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';

export default class Home extends React.Component {
  render() {
    let textColor = this.props.active ? '#fff' : Color.primary;
    let buttonColor = this.props.active ? Color.primary : '#fff';

    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          style={[styles.buttonTextWrapper, Style.boxShadow, { backgroundColor: buttonColor }]}
        >
          <Icon name={this.props.icon} color={textColor} size={24} />
          <Text style={[styles.buttonText, {color: textColor}]}>{this.props.title}</Text>
        </TouchableOpacity>

        <PlaySound
          style={[styles.buttonAudioWrapper, Style.boxShadow]}
          fileName={this.props.audioFileName}
          activePlaying={this.props.activePlaying}
          onPress={(fileName) => this.props.onPressPlaySound(fileName)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
});
