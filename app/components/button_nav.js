import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import CustomAudioPlayerComponent from './shared/CustomAudioPlayerComponent';
import Images from '../utils/images';

export default class ButtonNav extends React.Component {
  renderAudioPlayer() {
    return <CustomAudioPlayerComponent
              itemUuid={this.props.audioUuid}
              audio={this.props.audio}
              buttonStyle={{marginRight: 10}}
              isOutline={true}
            />
  }

  renderIcon(textColor) {
    return React.cloneElement(this.props.iconSet || <MaterialIcon/>, {
              name: this.props.icon, size: this.props.iconSize, color: textColor,
           })
  }

  render() {
    let textColor = this.props.active ? Color.white : Color.primary;
    let buttonColor = this.props.active ? this.props.buttonColor ? this.props.buttonColor : Color.primary : Color.white;
    let borderColor = this.props.buttonColor ? this.props.buttonColor : Color.primary;

    return (
      <View style={[styles.buttonWrapper, Style.boxShadow, { borderColor: borderColor, backgroundColor: buttonColor }, this.props.buttonWrapperStyle]}>
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          style={[styles.buttonTextWrapper, this.props.textWrapperStyle]}
        >
          { !!this.props.icon && this.renderIcon(textColor) }
          { !!this.props.image && <Image source={Images[this.props.image]} color={textColor} size={this.props.iconSize} style={this.props.imageStyle} />}

          <Text style={[styles.buttonText, { color: textColor }, this.props.textStyle]}>{this.props.title}</Text>
        </TouchableOpacity>

        {this.renderAudioPlayer()}
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
    height: 66
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
