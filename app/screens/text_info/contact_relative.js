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

export default class ContactRelative extends React.Component {
  state = {};

  _renderPhoneCode() {
    let list = [
      { country: 'កម្ពុជា', phoneCode: '855' },
      { country: 'ប្រទេសឡាវ', phoneCode: '856' },
      { country: 'ប្រទេសថៃ', phoneCode: '66' },
      { country: 'ប្រទេសម៉ាឡេស៊ី', phoneCode: '60' },
      { country: 'ចិន', phoneCode: '86' },
      { country: 'វៀតណាម', phoneCode: '84' },
      { country: 'មីយ៉ាន់ម៉ា​', phoneCode: '95' },
      { country: 'កូរ៉េខាងត្បូង', phoneCode: '82' },
    ]

    let doms = list.map((l, index) =>
      <Text key={index} style={{width: '50%', borderWidth: 1, borderColor: Color.border, padding: 8}}>
        {l.country} ៖
        <Text style={{color: Color.red}}> {l.phoneCode}</Text>
      </Text>
    );

    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginBottom: 10}}>
        {doms}
      </View>
    )
  }

  _renderInstruction() {
    let list = [
      { name: 'ចុច', value: '001'},
      { name: 'បន្ទាប់មក', value: 'លេខកូដប្រទេសរបស់អ្នក'},
      { name: 'បន្ទាប់ទៀត', value: 'លេខទូរស័ព្ទនៅប្រទេសរបស់អ្នក ដោយកុំចុចលេខ ០ ដំបូង'}
    ];

    let doms = list.map((l, index) =>
      <View key={index} style={{flexDirection: 'row'}}>
        <Text style={{width: 90}}>{l.name} ៖ </Text>
        <Text style={{flex: 1}}>{l.value}</Text>
      </View>
    )

    return (doms);
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          <View style={Style.card}>
            <Text>ប្រសិនបើអ្នកមានទូរស័ព្ទផ្ទាល់ខ្លូន អ្នកគួរយកវាទៅជាមួយពេលអ្នកធ្វើការចំណាកស្រុក។ ប៉ុន្តែ ស៊ីមកាតអ្នកពីប្រទេសរបស់អ្នក នឹងមិនដំណើរការទេនៅប្រទេសផ្សេងនោះ។ អ្នកត្រូវទិញស៊ីមកាតថ្មីនិងបញ្ចូលទឹកប្រាក់មុន សម្រាប់ធ្វើការហៅចេញ  នៅពេលដែលបានទៅដល់ប្រទេសថ្មីនោះ។ ប្រសិនបើអ្នក​មិនមានទូរស័ព្ទទេនោះ ប្រទេសគោលដៅជាច្រើនដូចជា ប្រទេសថៃ​ ឬប្រទេសម៉ាឡេស៊ីជាដើម មានកន្លែងប្រើអ៊ីនធឺណែតបង់ថ្លៃជាកន្លែងដែល អ្នកអាចចំណាយប្រាក់ដើម្បីទូរស័ព្ទមកផ្ទះបាន។ </Text>
            <Text style={{fontFamily: FontFamily.title, marginTop: 16, marginBottom: 8}}>ដើម្បីហៅទូរស័ព្ទមកកាន់ប្រទេសកំណើតរបស់អ្នក​ ចូលធ្វើដូចខាងក្រោម ៖</Text>

            { this._renderInstruction() }

            <Text style={{color: Color.red, textAlign: 'center', marginTop: 8, marginBottom: 8}}>001+លេខកូដប្រទេស+លេខទូរស័ព្ទ(មិនដាក់លេខសូន្យ)</Text>
            <Text>ខាងក្រោមនេះគឺជាលេខកូដមួយចំនួនសម្រាប់ប្រទេសផ្សេងៗ ៖</Text>

            { this._renderPhoneCode() }

            <Text style={{marginTop: 8, marginBottom: 8}}>ឧទាហរណ៍ ៖ <Text style={{color: Color.red}}>ប្រសិនបើលេខទូរស័ព្ទសាច់ញាតិរបស់អ្នកនៅក្នុងប្រទេស កម្ពុជា </Text>មានលេខ 012 820 544 នោះពេលអ្នកហៅទូរស័ព្ទពីប្រទេសថៃមកគឺត្រូវចុចដូចខាងក្រោម៖ </Text>
            <Text>អ្នកត្រូវចុចលេខ ៖ <Text style={{color: Color.red}}>001 855 12 820 544</Text> រួចហើយចុចបញ្ចូន</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
