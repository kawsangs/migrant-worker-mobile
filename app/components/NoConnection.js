import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NoConnection = (props) => {
  return (
    <TouchableOpacity
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      {...props}>

      <Icon name={"cloud"}/>

      <Text style={{fontWeight: 'bold'}}>Can't connect</Text>

      <View style={{flexDirection: 'row'}}>
        <Icon name={"undo"}/>
        <Text>Tap to Retry</Text>
      </View>
    </TouchableOpacity>
  );
}

export default NoConnection;
