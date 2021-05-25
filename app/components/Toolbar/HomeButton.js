import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-material-ui';

class HomeButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{padding: 16}}
        onPress={() => this.props.navigation.popToTop()}>

        <Icon name={'home'} size={30} style={{color: '#fff'}}/>
      </TouchableOpacity>
    );
  }
}

export default HomeButton;
