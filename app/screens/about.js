import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';

export default class About extends React.Component {
  state = {};

  _renderLogo(name, url, option={}) {
    return (
      <TouchableOpacity
        style={{margin: 10}}
        onPress={() => Linking.openURL(url)}>
        <Image source={Images[name]} style={{width: option.w, height: option.h}} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={[Style.container, {alignItems: 'center'}]}>
          <View style={Style.card}>
            <Image source={Images.logo} style={{width: 90, height: 90}}/>
          </View>

          <Text style={{fontFamily: FontFamily.title, marginBottom: 30}}>កម្មវិធីចំណាកស្រុកឆ្លាតវៃ</Text>

          <Text style={{textAlign: 'justify'}}>
            កម្មវិធីចំណាកស្រុកឆ្លាតវៃជាកម្មវិធីទូរស័ព្ទដែលបានបង្កើតឡើងដើម្បីជាជំនួយដល់យុវជន យុវនារីចំណាកស្រុក ក្នុងការទទួលបានព័ត៌មានទាក់ទងនឹងព័ត៌មានផ្សេងៗទាក់ទងនឹងចំណាកស្រុកសុវត្ថិភាព ដែលរួមមាន ប្រភេទឯកសារស្របច្បាប់សំរាប់ការចំណាកស្រុកសុវត្ថិភាព​​​ វីដេអូអប់រំ ឯកសារផ្សេងៗដែលជាជំនួយដល់ការចំណាកស្រុក លេខទំនាក់ទំនងនៅប្រទេសកម្ពុជា និងបណ្តាប្រទេសផ្សេងៗ។ ការបង្កើតកម្មវិធីនេះឡើង គឺក្នុងគោលបំណងអោយយុវជន​​​ យុវនារី ដែលមានបំណងចំណាកស្រុក អោយបានត្រៀមខ្លួនទុកជាមុន និងវាយតំលៃមើលថាតើ ឯកសារដែលគាត់មានគ្រប់គ្រាន់ហើយរឺនៅសំរាប់ការចំណាកស្រុក និងអ្វីខ្លះទៀតដែលគាត់គួរយល់ដឹង វាមិនត្រឹមតែជាឧបករណ៍សំរាប់ស្វែងយល់មុនពេលចំណាកស្រុកទេ តែអ្នកដែលបានចំណាកស្រុកហើយក្តីក៏នៅតែអាចប្រើប្រាស់កម្មវិធីនេះបានដើម្បី ដឹងពីសេវាគាំទ្ររបស់ពួកគាត់មាននៅទីណាខ្លះ ហើយអាចទំនាក់ទំនងដោយវិធីណា។ កម្មវិធីចំណាកស្រុកឆ្លាតវៃត្រូវបានបង្កើតឡើងក្រោមការសហការណ៍រវាង អង្គការ UN Women អង្គការបណ្តាញទូរស័ព្ទជំនួយកុមារកម្ពុជា និងអង្គការអ៊ីនស្តេត ក្រោមជំនួយថវិការដោយ Spotlight Initiative។
          </Text>

          <Text style={{fontFamily: FontFamily.title, marginTop: 14}}>សហការផលិតដោយ</Text>

          { this._renderLogo('unwomen', 'http://ilabsoutheastasia.org', {w: 194, h: 55}) }
          { this._renderLogo('instedd_logo', 'http://ilabsoutheastasia.org', {w: 234, h: 70}) }
          { this._renderLogo('chc_logo', 'http://ilabsoutheastasia.org', {w: 212, h: 70}) }

          <Text style={{fontFamily: FontFamily.title, marginTop: 14}}>ក្រោមជំនួយថវិការដោយ</Text>

          { this._renderLogo('spotlight', 'http://ilabsoutheastasia.org', {w: 203, h: 110}) }
        </View>
      </ScrollView>
    );
  }
}
