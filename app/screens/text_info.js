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

  _onPress(screenName) {
    this.props.navigation.navigate(screenName);
  }

  _renderCard(screen) {
    return (
      <TouchableOpacity
        key={ uuidv4() }
        style={Style.card}
        onPress={() => this._onPress(screen.screenName)}
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
      { title: 'របៀបសន្សំ និងផ្ញើរប្រាក់', screenName: 'SavingScreen', fileName: '' },
      { title: 'វិធីទំនាក់ទំនងសាច់ញាតិ', screenName: 'ContactRelativeScreen', fileName: '' },
      { title: 'ការធ្វើចំណាកស្រុកប្រកបដោយសុវត្ថិភាព(ផ្នែកទី ១)', screenName: 'SavingScreen', fileName: '' },
      { title: 'ការធ្វើចំណាកស្រុកប្រកបដោយសុវត្ថិភាព(ផ្នែកទី ២)', screenName: 'SavingScreen', fileName: '' },
      { title: 'កូនសៀវភៅនាវិកវៃឆ្លាត', screenName: 'SavingScreen', fileName: '' },
      { title: 'ឧបករណ៍នាវិកវៃឆ្លាត', screenName: 'SavingScreen', fileName: '' },
      { title: 'ព័ត៌មានអំពីការជួញដូរមនុស្សនិងការធ្វើចំណាកស្រុក', screenName: 'SavingScreen', fileName: '' },
      { title: 'បំនិនជីវិតដែលអាចកសាងលទ្ធភាពស្តារឡើងវិញរបស់បុគ្គល', screenName: 'SavingScreen', fileName: '' },
      { title: 'ការធ្វើផែនការចំណាកស្រុកប្រកបដោយសុវត្ថិភាព', screenName: 'SavingScreen', fileName: '' },
      { title: 'ការធ្វើសកម្មភាព', screenName: 'SavingScreen', fileName: '' },
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
