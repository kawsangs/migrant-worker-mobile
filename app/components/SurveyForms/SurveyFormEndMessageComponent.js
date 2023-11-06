import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Color, FontFamily } from '../../assets/stylesheets/base_style';

const SurveyFormEndMessageComponent = (props) => {
  const hasNoQuestion = props.visibleQuestions.filter(q => q == true).length == 0;

  return (
    <View style={[{paddingTop: 12, alignItems: 'center', justifyContent: 'center'}, hasNoQuestion && {flex: 1}]}>
      <Icon name='checkmark-circle-outline' size={hasNoQuestion ? 100 : 70} color='#55d806' />
      <Text style={{fontFamily: FontFamily.body, marginLeft: 12}}>
        អរគុណសម្រាប់ការចូលរួមការស្ទង់មតិ
      </Text>
    </View>
  )
}

export default SurveyFormEndMessageComponent;