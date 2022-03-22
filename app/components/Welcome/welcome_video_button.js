import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import { Icon } from 'react-native-material-ui';
import DeviceInfo from 'react-native-device-info';

import { Color, Style } from '../../assets/stylesheets/base_style';
import { XXHDPIRatio } from '../../constants/screen_size_constant';

const screenHeight = Dimensions.get('screen').height;

class WelcomeVideoButton extends Component {
  videoButtonBottom() {
    if (DeviceInfo.isTablet())
      return screenHeight / 3.2;

    return PixelRatio.get() < XXHDPIRatio ? screenHeight / 4.3 : screenHeight / 5;
  }

  render() {
    return (
      <View style={{ width: '100%', position: 'absolute', alignItems: 'center', bottom: this.videoButtonBottom(), zIndex: 10}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{backgroundColor: '#fff', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => this.props.onPressItem()}>

          <View style={{
            backgroundColor: Color.primary,
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon name='play-arrow' size={30} color={Color.white} iconSet='MaterialIcons' />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default WelcomeVideoButton;