import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import {Color} from '../../assets/stylesheets/base_style';
import {bigPressableSize} from '../../constants/component_constant';

const RadioButtonComponent = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.value)}
      style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: Color.divideLineColor}}
    >
      <Checkbox.Item status={props.selected ? 'checked' : 'unchecked'} value={props.value} style={{paddingLeft: 0, minHeight: bigPressableSize}} />
      <Text style={{flexShrink: 1}}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export default RadioButtonComponent;