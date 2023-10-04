import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import {Color} from '../../assets/stylesheets/base_style';

const RadioButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.value)} style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: Color.divideLineColor, paddingVertical: 6}}>
      <View style={{minHeight: 48, borderWidth: 0, justifyContent: 'center', paddingRight: 12}}>
        <RadioButton value={props.value} style={{paddingLeft: 0}} onPress={() => props.onPress(props.value)} status={ props.isSelected ? 'checked' : 'unchecked' } />
      </View>
      {!!props.image && <Image source={props.image} style={{width: 24, height: 24, marginRight: 10}} /> }
      <Text style={{flexShrink: 1}}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export default RadioButtonComponent;