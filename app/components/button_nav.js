import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import Images from '../utils/images';

export default class ButtonNav extends React.Component {
  render() {
    let textColor = this.props.active ? Color.white : Color.primary;
    let buttonColor = this.props.active ? this.props.buttonColor ? this.props.buttonColor : Color.primary : Color.white;
    let borderColor = this.props.buttonColor ? this.props.buttonColor : Color.primary;

    let iconTintColor = this.props.active ? Color.primary : Color.pink;

    return (
      <View style={[styles.buttonWrapper, Style.boxShadow, { borderColor: borderColor, backgroundColor: buttonColor }, this.props.buttonWrapperStyle]}>
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          style={[styles.buttonTextWrapper, this.props.textWrapperStyle]}
        >
          { !!this.props.icon && <Icon name={this.props.icon} color={textColor} size={this.props.iconSize} iconSet={this.props.iconSet || "MaterialIcons"} />}
          { !!this.props.image && <Image source={Images[this.props.image]} color={textColor} size={this.props.iconSize} style={this.props.imageStyle} />}

          <Text style={[styles.buttonText, { color: textColor }, this.props.textStyle]}>{this.props.title}</Text>
        </TouchableOpacity>

        <PlaySound
          style={[styles.buttonAudioWrapper, this.props.audioWrapperStyle]}
          buttonAudioStyle={[{ backgroundColor: textColor}, this.props.playSoundSize]}
          iconStyle={[{ tintColor: iconTintColor }, this.props.playSoundSize]}
          filePath={this.props.audio}
          audioPlayer={this.props.audioPlayer}
          updateMainAudioPlayer={(sound) => this.props.updateAudioPlayer(sound)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 16,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    alignItems: 'center',
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    flex: 1,
    padding: 14,
    marginRight: 10,
  },
  buttonText: {
    marginLeft: 20,
    fontFamily: FontFamily.title,
  },
  buttonAudioWrapper: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
