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
import PlaySound from '../components/play_sound';
import Images from '../utils/images';
import uuidv4 from '../utils/uuidv4';

export default class TextInfo extends React.Component {
  state = {};

  _onPress(screen) {
    this.props.navigation.navigate(screen.routeName, {title: screen.title, pdfFilename: screen.pdfFile});
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
      { title: 'ភ្នាក់ងារចំណាកស្រុក', routeName: 'MigrationAgencyScreen', pdfFile: '', fileName: '' },
      { title: 'របៀបសន្សំ និងផ្ញើរប្រាក់', routeName: 'PdfViewScreen', pdfFile: 'smart_money', fileName: '' },
      { title: 'វិធីទំនាក់ទំនងសាច់ញាតិ', routeName: 'ContactRelativeScreen', pdfFile: '', fileName: '' },
      { title: 'ការធ្វើចំណាកស្រុកប្រកបដោយសុវត្ថិភាព(ផ្នែកទី ១)', routeName: 'PdfViewScreen', pdfFile: 'safe_migration_part1', fileName: '' },
      { title: 'ការធ្វើចំណាកស្រុកប្រកបដោយសុវត្ថិភាព(ផ្នែកទី ២)', routeName: 'PdfViewScreen', pdfFile: 'safe_migration_part2', fileName: '' },
      { title: 'កូនសៀវភៅនាវិកវៃឆ្លាត', routeName: 'PdfViewScreen', pdfFile: 'smart_navigator_book', fileName: '' },
      { title: 'ឧបករណ៍នាវិកវៃឆ្លាត', routeName: 'PdfViewScreen', pdfFile: 'smart_navigator_toolkit_part_a', fileName: '' },
      { title: 'ព័ត៌មានអំពីការជួញដូរមនុស្សនិងការធ្វើចំណាកស្រុក', routeName: 'PdfViewScreen', pdfFile: 'smart_navigator_toolkit_part_b', fileName: '' },
      { title: 'បំនិនជីវិតដែលអាចកសាងលទ្ធភាពស្តារឡើងវិញរបស់បុគ្គល', routeName: 'PdfViewScreen', pdfFile: 'smart_navigator_toolkit_part_c', fileName: '' },
      { title: 'ការធ្វើផែនការចំណាកស្រុកប្រកបដោយសុវត្ថិភាព', routeName: 'PdfViewScreen', pdfFile: 'smart_navigator_toolkit_part_d', fileName: '' },
      { title: 'ការធ្វើសកម្មភាព', routeName: 'PdfViewScreen', pdfFile: 'smart_navigator_toolkit_part_e', fileName: '' },
    ]

    return list.map(l => this._renderCard(l));
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          { this._renderCardList() }
        </View>
      </ScrollView>
    );
  }
}
