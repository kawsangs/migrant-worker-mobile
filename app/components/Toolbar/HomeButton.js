import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-material-ui';

class HomeButton extends Component {
  onPress() {
    if(!!this.props.onPress) {
      return this.props.onPress();
    }

    this.props.navigation.popToTop();
  }

  render() {
    return (
      <TouchableOpacity
        style={{padding: 16}}
        onPress={() => this.onPress()}>

        <Icon name={'home'} size={30} style={{color: '#fff'}}/>
      </TouchableOpacity>
    );
  }
}

export default HomeButton;
