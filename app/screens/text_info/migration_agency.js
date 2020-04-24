import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';

export default class MigrationAgency extends React.Component {
  state = {};

  _onPress(screen) {
    this.props.navigation.navigate('PdfViewScreen', {title: screen.title, pdfFilename: screen.pdfFile});
  }

  _renderCard(screen) {
    return (
      <TouchableOpacity
        key={ uuidv4() }
        style={Style.card}
        onPress={() => this._onPress(screen)}
        >
        <View style={Style.cardContent}>
          <View style={{flex: 1, marginRight: 16, justifyContent: 'center'}}>
            <Text>{screen.title}</Text>
          </View>

          <PlaySound
            style={{paddingLeft: 10}}
            fileName={screen.fileName || 'register'}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({activePlaying: fileName})}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, fontFamily: FontFamily.title, color: Color.primary}}>ចូលមើល</Text>
          <Icon name='keyboard-arrow-right' size={24} />
        </View>
      </TouchableOpacity>
    );
  }

  _renderCardList() {
    let list = [
      { title: 'ភ្នាក់ងារចំណាកស្រុកទៅថៃ', pdfFile: 'agency_thai', fileName: '' },
      { title: 'ភ្នាក់ងារចំណាកស្រុកទៅម៉ាឡេស៊ី', pdfFile: 'agency_malaysia', fileName: '' },
      { title: 'ភ្នាក់ងារចំណាកស្រុកទៅសិង្ហបុរី', pdfFile: 'agency_singapore', fileName: '' },
      { title: 'ភ្នាក់ងារចំណាកស្រុកទៅជប៉ុន', pdfFile: 'agency_japan', fileName: '' },
      { title: 'ភ្នាក់ងារចំណាកស្រុកទៅហុងកុង', pdfFile: 'agency_hongkong', fileName: '' },
      { title: 'ភ្នាក់ងារចំណាកស្រុកទៅអារ៉ាប់', pdfFile: 'agency_arab_emirate', fileName: '' },
      { title: 'ភ្នាក់ងារចំណាកស្រុកទៅគុយវ៉ែត', pdfFile: 'agency_kuwait', fileName: '' },
      { title: 'ភ្នាក់ងារចំណាកស្រុកទៅកាតា', pdfFile: 'agency_cata', fileName: '' },
    ]

    return list.map(l => this._renderCard(l));
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          <Text>ស្វែងរកពត័មានភ្នាក់ងារតាមប្រទេសខាងក្រាម</Text>
          { this._renderCardList() }
        </View>
      </ScrollView>
    );
  }
}
