import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

class OutlineInfoIcon extends Component {
  render() {
    return (
      <View style={[styles.iconContainer, this.props.customIconContainerStyles]}>
        <Image source={require('../assets/images/icons/exclamation.png')} resizeMode='contain' style={[{width: 10, height: 32}, this.props.customIconStyles]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 3,
    borderColor: "#e6e7e9",
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 40,
    height: 48,
    width: 48,
    marginRight: 15,
    alignItems: 'center'
  }
});

export default OutlineInfoIcon;
