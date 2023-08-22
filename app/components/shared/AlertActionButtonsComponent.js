import React from 'react';
import {View} from 'react-native';
import OutlineButtonComponent from './OutlineButtonComponent';
import { Color } from '../../assets/stylesheets/base_style';

const AlertActionButtonsComponent = (props) => {
  return (
    <View style={[{flexDirection: 'row', padding: 16, justifyContent: 'flex-end'}, props.containerStyle]}>
      { !props.hideLeftButton && <OutlineButtonComponent label={props.leftLabel} color={Color.gray} style={{marginRight: 16}} onPress={() => props.onPressLeft()} /> }
      { <OutlineButtonComponent label={props.rightLabel} color={Color.primary} onPress={() => props.onPressRight()} /> }
    </View>
  )
}

export default AlertActionButtonsComponent;