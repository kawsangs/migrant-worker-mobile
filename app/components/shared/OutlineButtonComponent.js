import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const OutlineButtonComponent = (props) => {
  return <TouchableOpacity onPress={() => props.onPress()} style={[{paddingHorizontal: 5, marginRight: 5, borderWidth: 1.5, borderColor: props.color, borderRadius: 6, height: 48, paddingHorizontal: 12, justifyContent: 'center'}, props.style]}>
            <Text style={{color: props.color}}>{props.label}</Text>
          </TouchableOpacity>
}

export default OutlineButtonComponent;