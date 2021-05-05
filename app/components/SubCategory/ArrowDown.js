import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Images from '../../utils/images';

class ArrowDown extends Component {
  state = {};

  render() {
    return (
      <View style={styles.arrowDown}>
        <Image source={Images.down} style={styles.arrowDownImage} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  arrowDown: {
    flex: 1,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowDownImage: {
    width: 30,
    height: 30,
    tintColor: Color.gray
  }
});

export default ArrowDown;
