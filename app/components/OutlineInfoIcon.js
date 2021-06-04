import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-material-ui';

class OutlineInfoIcon extends Component {
  render() {
    return (
      <View style={[styles.iconContainer, this.props.customIconContainerStyles]}>
        <Icon name='exclamation' color={"#ffc107"} style={{}} iconSet={'MaterialCommunityIcons'} />
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
