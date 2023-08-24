import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import {Color} from '../../assets/stylesheets/base_style';

const RadioButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.value)} style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: Color.divideLineColor, paddingVertical: 6}}>
      <RadioButton.Item value={props.value} style={{paddingLeft: 0}} />
      {!!props.image && <Image source={props.image} style={{width: 24, height: 24, marginRight: 10}} /> }
      <Text style={{flexShrink: 1}}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export default RadioButtonComponent;