import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { Color, FontFamily, FontSize } from '../../assets/stylesheets/base_style';

class MiniSoundPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const icon = this.props.playing ? 'pause' : 'play';

    return (
      // <Animated.View style={this.props.containerStyle}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.openModal()} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <ImageBackground
              source={this.props.image}
              style={{width: 70, height: 50}}
              resizeMode='contain'
            />

            <Text style={{flex: 1, fontFamily: FontFamily.title, fontSize: 14, paddingHorizontal: 14}} numberOfLines={1}>
              { this.props.title }
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.playAudio()}>
            <Icon name={icon} size={20} iconSet="FontAwesome" style={[{paddingHorizontal: 10, color: 'black'}, this.props.disabledColor]} />
          </TouchableOpacity>
        </View>
      // </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default MiniSoundPlayer;