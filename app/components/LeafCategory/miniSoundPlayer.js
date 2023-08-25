import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color, FontFamily } from '../../assets/stylesheets/base_style';

class MiniSoundPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
          <Icon name={!!this.props.countInterval ? 'pause' : 'play'} size={20} style={[{paddingHorizontal: 10, color: 'black'}, !this.props.audio && { color: Color.lightGray }]} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default MiniSoundPlayer;