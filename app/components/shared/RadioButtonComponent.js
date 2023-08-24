import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={{flexDirection: 'row', alignItems: 'center'}}>
      <RadioButton.Item value={props.value} style={{paddingLeft: 0}} />
      {!!props.image && <Image source={props.image} style={{width: 24, height: 24, marginRight: 10}} /> }
      <Text>{props.label}</Text>
    </TouchableOpacity>
  )
}

export default RadioButtonComponent;