import React from 'react';
import { Image } from 'react-native';

const AppIcon = (props) => {
  const icons = {
    clap: require('../assets/images/icons/clap.png'),
    warning: require('../assets/images/icons/info-triangle.png')
  }

  return (
    <Image source={icons[props.iconType]}
      style={[{width: 48, height: 48}, props.customStyles]}
    />
  )
}

export default AppIcon;