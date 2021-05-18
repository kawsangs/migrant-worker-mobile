import React from 'react';
import { View, Text } from 'react-native';

class EmptyResult extends React.Component {
  render() {
    return (
      <View style={{
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{
          color: '#888',
        }}>{this.props.message}</Text>
      </View>
    )
  }
}

export default EmptyResult;
