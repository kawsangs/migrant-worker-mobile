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

          <Text style={{fontFamily: FontFamily.title, marginBottom: 30}}>កម្មវិធីចំណាកស្រុកសុវត្ថិភាព</Text>

          <Text style={{textAlign: 'justify'}}>
            កម្មវិធីចំណាកស្រុកសុវត្ថិភាព គឺជាកម្មវិធីទូរស័ព្ទមួយដែលផ្តោតលើការឆ្លើយតបចំពោះអំពើហិង្សាលើស្រ្តី រួមមាន ការចំណាកស្រុក ការជួញដូរ ឬកេងប្រវ័ញ្ច និងកញ្ចប់សេវាថ្នាក់ជាតិដែលឆ្លើយតបនឹងអំពើហិង្សាលើស្ត្រី និងការបញ្ចេញយោបល់របស់អ្នកប្រើប្រាស់លើសេវានោះ ដែលដកស្រង់ពីកញ្ចប់សេវាចាំបាច់សម្រាប់ស្ត្រី និងក្មេងស្រីជាក្រុមគោលដៅដែលអាចងាយរងគ្រោះពីអំពើហិង្សា និងសេវាស្តង់ដារមួយចំនួនទៀតដែលមាននៅក្នុងប្រទេសកម្ពុជា។ កម្មវិធីចំណាកស្រុកឆ្លាតវៃត្រូវបានបង្កើតឡើងក្រោមការសហការណ៍រវាង អង្គការ UN Women អង្គការបណ្តាញទូរស័ព្ទជំនួយកុមារកម្ពុជា និងអង្គការអ៊ីនស្តេត ក្រោមជំនួយថវិកាពីកម្មវិធីសុវត្ថិភាព និងយុត្តិធម៌ Spotlight Initiative។
          </Text>
          <Text style={{textAlign: 'justify', marginTop: 16}}>
            កម្មវិធីសុវត្ថិភាព និងយុត្តិធម៌៖ សម្រេចឱ្យបាននូវសិទ្ធិ និងឱកាស​របស់​ពលករ​ទេសន្តរ​ប្រវេសន៍​ជា​ស្រ្តី​​ក្នុងតំបន់សមាគមប្រជាជាតិអាស៊ីអាគ្នេយ៍ (ASEAN) គឺជាផ្នែក​មួយនៃ​គំនិត​​ផ្តួចផ្តើមប្រទីបបំភ្លឺផ្លូវ (Spot​light) ដើម្បី​លុប​បំបាត់អំពើហិង្សាលើស្រ្តី និងក្មេងស្រី ជា​គំនិត​ផ្តួចផ្តើមសកលដែលអនុវត្តរយៈច្រើនឆ្នាំ រវាងសហភាពអឺរ៉ុប និងអង្គការសហប្រជាជាតិ។ ការអនុវត្តកម្មវិធីសុវត្ថិភាព និងយុត្តិធម៌ ធ្វើឡើង​ តាមរយៈ​ភាព​ជា​ដៃគូ​រវាង អង្គការអន្តរជាតិខាងការងារ (ILO) និងភ្នាក់ងារសហប្រជាជាតិលើកកម្ពស់សមភាពយេនឌ័រនិងផ្តល់ភាពអង់អាចដល់ស្ត្រី (UN Women) (ដោយសហការជាមួយនឹង UNODC) ដោយមានគោលដៅរួម ដើម្បីធានាថា ទេសន្តរ​​ប្រវេសន៍ការងារមានសុវត្ថិភាព និងយុត្តិធម៌សម្រាប់ស្រ្តីគ្រប់រូប ក្នុងតំបន់អាស៊ាន។
          </Text>

          <Text style={{fontFamily: FontFamily.title, marginTop: 14}}>សហការផលិតដោយ</Text>

          { this._renderLogo('unwomen', 'http://ilabsoutheastasia.org', {w: 194, h: 55}) }
          { this._renderLogo('instedd_logo', 'http://ilabsoutheastasia.org', {w: 234, h: 70}) }
          { this._renderLogo('chc_logo', 'http://ilabsoutheastasia.org', {w: 212, h: 70}) }

          <Text style={{fontFamily: FontFamily.title, marginTop: 14}}>ក្រោមជំនួយថវិកាដោយ</Text>

          { this._renderLogo('spotlight', 'http://ilabsoutheastasia.org', {w: 203, h: 110}) }
          { false && this._renderLogo('spotlight_long', 'http://ilabsoutheastasia.org', {w: 300, h: 41}) }
        </View>
      </ScrollView>
    );
  }
}
