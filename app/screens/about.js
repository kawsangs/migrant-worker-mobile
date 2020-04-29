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

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';
import uuidv4 from '../utils/uuidv4';
import { autoImageHeight } from '../utils/image_style';

export default class About extends React.Component {
  state = {};

  _onPress(url) {
    if (!url) { return; }

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
      }
    });
  }

  _renderLogo(logo) {
    let imageStyle = autoImageHeight(logo.containerWidth, logo.width, logo.height);

    return (
      <TouchableOpacity
        key={uuidv4()}
        style={{margin: 10}}
        onPress={() => this._onPress(logo.url)}>
        <Image source={Images[logo.name]} style={imageStyle} />
      </TouchableOpacity>
    )
  }

  _renderDescription() {
    return (
      <View style={[Style.container, {alignItems: 'center'}]}>
        <View style={Style.card}>
          <Image source={Images.logo} style={{width: 90, height: 90}}/>
        </View>

        <Text style={{fontFamily: FontFamily.title, marginBottom: 30}}>កម្មវិធីចំណាកស្រុកសុវត្ថិភាព</Text>

        <Text style={{textAlign: 'justify'}}>
          កម្មវិធីចំណាកស្រុកសុវត្ថិភាព គឺជាកម្មវិធីទូរស័ព្ទមួយដែលផ្តោតលើការឆ្លើយតបចំពោះអំពើហិង្សាលើស្រ្តី រួមមាន ការចំណាកស្រុក ការជួញដូរ ឬកេងប្រវ័ញ្ច និងកញ្ចប់សេវាថ្នាក់ជាតិដែលឆ្លើយតបនឹងអំពើហិង្សាលើស្ត្រី និងការបញ្ចេញយោបល់របស់អ្នកប្រើប្រាស់លើសេវានោះ ដែលដកស្រង់ពីកញ្ចប់សេវាចាំបាច់សម្រាប់ស្ត្រី និងក្មេងស្រីជាក្រុមគោលដៅដែលអាចងាយរងគ្រោះពីអំពើហិង្សា និងសេវាស្តង់ដារមួយចំនួនទៀតដែលមាននៅក្នុងប្រទេសកម្ពុជា។ កម្មវិធីចំណាកស្រុកសុវត្ថិភាពត្រូវបានបង្កើតឡើងក្រោមការសហការណ៍រវាង អង្គការ UN Women អង្គការបណ្តាញទូរស័ព្ទជំនួយកុមារកម្ពុជា និងអង្គការអ៊ីនស្តេត ក្រោមជំនួយថវិកាពីកម្មវិធីសុវត្ថិភាព និងយុត្តិធម៌ Spotlight Initiative។
        </Text>
        <Text style={{textAlign: 'justify', marginTop: 16}}>
          កម្មវិធីសុវត្ថិភាព និងយុត្តិធម៌៖ សម្រេចឱ្យបាននូវសិទ្ធិ និងឱកាស​របស់​ពលករ​ទេសន្តរ​ប្រវេសន៍​ជា​ស្រ្តី​​ក្នុងតំបន់សមាគមប្រជាជាតិអាស៊ីអាគ្នេយ៍ (ASEAN) គឺជាផ្នែក​មួយនៃ​គំនិត​​ផ្តួចផ្តើមប្រទីបបំភ្លឺផ្លូវ (Spot​light) ដើម្បី​លុប​បំបាត់អំពើហិង្សាលើស្រ្តី និងក្មេងស្រី ជា​គំនិត​ផ្តួចផ្តើមសកលដែលអនុវត្តរយៈច្រើនឆ្នាំ រវាងសហភាពអឺរ៉ុប និងអង្គការសហប្រជាជាតិ។ ការអនុវត្តកម្មវិធីសុវត្ថិភាព និងយុត្តិធម៌ ធ្វើឡើង​ តាមរយៈ​ភាព​ជា​ដៃគូ​រវាង អង្គការអន្តរជាតិខាងការងារ (ILO) និងភ្នាក់ងារសហប្រជាជាតិលើកកម្ពស់សមភាពយេនឌ័រនិងផ្តល់ភាពអង់អាចដល់ស្ត្រី (UN Women) (ដោយសហការជាមួយនឹង UNODC) ដោយមានគោលដៅរួម ដើម្បីធានាថា ទេសន្តរ​​ប្រវេសន៍ការងារមានសុវត្ថិភាព និងយុត្តិធម៌សម្រាប់ស្រ្តីគ្រប់រូប ក្នុងតំបន់អាស៊ាន។
        </Text>
      </View>
    )
  }

  _renderCollaborations() {
    let logos = [
      { name: 'unwomen', url: '', containerWidth: '194', width: '247', height: '70'},
      { name: 'instedd_logo', url: '', containerWidth: '234', width: '908', height: '272'},
      { name: 'chc_logo', url: '', containerWidth: '212', width: '896', height: '296'},
    ];

    return (
      logos.map((logo) => this._renderLogo(logo) )
    )
  }

  _renderFunders() {
    let logos = [
      { name: 'spotlight', url: '', containerWidth: '260', width: '2560', height: '1384' },
      { name: 'eu', url: '', containerWidth: '70', width: '600', height: '401' },
      { name: 'undp', url: '', containerWidth: '65', width: '910', height: '784' },
      { name: 'global_support', url: '', containerWidth: '60', width: '900', height: '939' },
      { name: 'gender_equality', url: '', containerWidth: '50', width: '1080', height: '1080' },
    ]
    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        { this._renderLogo(logos[0]) }

        <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: -10}}>
          { logos.slice(1, 5).map((logo) => this._renderLogo(logo)) }
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={[{alignItems: 'center'}]}>

          { true && this._renderDescription() }

          <Text style={{fontFamily: FontFamily.title, marginTop: 14}}>សហការផលិតដោយ</Text>

          { this._renderCollaborations() }

          <Text style={{fontFamily: FontFamily.title, marginTop: 16}}>ក្រោមជំនួយថវិកាដោយ</Text>

          { this._renderFunders() }
        </View>
      </ScrollView>
    );
  }
}
