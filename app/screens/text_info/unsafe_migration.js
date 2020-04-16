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
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';

export default class UnsafeMigration extends React.Component {
  state = {};

  _renderContent() {
    let list = [
      { title: 'គុណសម្បត្តិនៃការចំណាកស្រុកស្របច្បាប់', value: 'ការចំណាកស្រុកស្របច្បាប់ គឺជាការមានឯកសារស្របច្បាប់ដើម្បីធ្វើការចំណាកស្រុកទៅកាន់ប្រទេសគោលដៅ ដែលឯកសារទាំងអស់នោះមានដូចជា លិខិតឆ្លងដែន ទិដ្ឋាការ លិខិតអនុញ្ញាតឲ្យធ្វើការងារពីក្រសួងការងារ ទីភ្នាក់ងារជ្រើសរើសពលករ​ស្របច្បាប់ កិច្ចសន្យាការងារជាដើម​។ ការមានឯកសារបែបនេះ និងនាំឲ្យអ្នកចំណាកស្រុក មានការងារប្រកបដោយសុវត្ថិភាព មានការងារល្អជាក់លាក់ មានជំនាញ ហើយជៀសផុតពីអំពើជួញដូរមនុស្ស ការកេងប្រវ័ញ្ច​ និងសុវត្ថិភាពពេលអ្នកធ្វើដំណើរ។'},
      { title: 'គុណវិបត្តិនៃការចំណាកស្រុកខុសច្បាប់', value: 'ការចំណាកស្រុកខុសច្បាប់ គឺជាដែលមិនមានឯកសារស្របច្បាប់ ដោយធ្វើការចំណាកស្រុកតាមរយៈ មេខ្យល់ សាច់ញាតិ/មិត្តភក្តិ/អ្នកមិនដែលមិនស្គាល់គ្នា​  ឆ្លងកាត់ព្រំដែន ដោយខ្លួនឯង។ ការចំណាកស្រុកបែបនេះ នឹងនាំឲ្យអ្នក ជួបគ្រោះថ្នាក់ ពេលកំពុងធ្វើដំណើរក៏ដួចជាពេលធ្វើការនៅប្រទេសគោលដៅ ប្រឈមភាពគ្មានការងារធ្វើ ឬទីកន្លែងស្នាក់នៅ និងកាន់តែងាយត្រូវបានគេជួញដូរ និងកេងប្រវ័ញ្ច។'},
    ];

    let doms = list.map((l, index) =>
      <View style={Style.card} key={index}>
        <Text style={{fontFamily: FontFamily.title, textAlign: 'center', marginBottom: 8}}>{l.title}</Text>
        <Text>{l.value}</Text>
      </View>
    );

    return doms;
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
         { this._renderContent() }
        </View>
      </ScrollView>
    );
  }
}
