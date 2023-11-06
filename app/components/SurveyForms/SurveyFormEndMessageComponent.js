import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Color, FontFamily } from '../../assets/stylesheets/base_style';

const SurveyFormEndMessageComponent = (props) => {
  return (
    <View style={[{paddingTop: 12, justifyContent: 'center'}, props.visibleQuestions.filter(q => q == true).length == 0 && {flex: 1}]}>
      <Text style={{fontFamily: FontFamily.title}}>អរគុណសម្រាប់ការចូលរួមការស្ទង់មតិ</Text>

      <View style={{flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 16, borderWidth: 1.5, borderColor: '#dbdbdb', borderRadius: 10, marginTop: 10, backgroundColor: Color.white}}>
        <Icon name='info' size={24} color={Color.primary} />
        <View style={{fontFamily: FontFamily.body, marginLeft: 12}}>
          <Text>ដើម្បីចាក់ចេញពីការស្ទង់មតិ សូមចុចលើប៊ូតុង <Text style={{fontFamily: FontFamily.title}}>"បញ្ចប់"</Text>។</Text>
        </View>
      </View>
    </View>
  )
}

export default SurveyFormEndMessageComponent;