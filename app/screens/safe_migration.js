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
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import Images from '../utils/images';
import uuidv4 from '../utils/uuidv4';

export default class SafeMigration extends React.Component {
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
          <View style={Style.avata}>
            <Image source={Images[screen.image]} style={{width: screen.w, height: screen.h}} />
          </View>

          <View style={{flex: 1, marginLeft: 16, marginRight: 16, justifyContent: 'center'}}>
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
      { title: 'កុងត្រាស្វែករកការងារក្នុងប្រទេសគោលដៅ', image: 'agreement', screenName: 'AgreementScreen', fileName: '', w: 34, h: 43},
      { title: 'សៀវភៅការងារ', image: 'workbook', screenName: 'WorkbookScreen', fileName: '', w: 34, h: 44 },
      { title: 'លិខិតឆ្លងដែន', image: 'passport', screenName: 'PassportScreen', fileName: '', w: 34, h: 45 },
      { title: 'ឯកសារផ្សេងៗ', image: 'other_doc', screenName: 'OtherDocScreen', fileName: '', w: 34, h: 41 },
      { title: 'Migration Agency', image: 'other_doc', screenName: 'OtherDocScreen', fileName: '', w: 34, h: 41 },
    ]

    return list.map(l => this._renderCard(l));
  }

  _renderCheckListCard() {
    return (
      <TouchableOpacity
        style={Style.card}
        onPress={() => this._onPress('ChecklistScreen')}
        >
        <View style={[Style.cardContent, {borderBottomWidth: 0}]}>
          <Icon name='info' size={24} />

          <View style={{flex: 1, marginLeft: 16, justifyContent: 'center'}}>
            <Text style={{fontFamily: FontFamily.title, color: Color.primary}}>បញ្ជីត្រួតពិនិត្យមុនចេញដំណើរ</Text>
          </View>

          <PlaySound
            style={{paddingLeft: 10}}
            fileName={'register'}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({activePlaying: fileName})}/>
        </View>

        <Text>ចូលគូសធីច នៅការងារ រឺឯកសារដែលអ្នក រឺភ្នាក់ងារនាំពលករធ្វើការនៅក្រៅប្រទេសបានបំពេញរួច</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          { this._renderCheckListCard() }
          <Text>ស្វែងរកពត័មានខាងក្រាម</Text>
          { this._renderCardList() }
        </View>
      </ScrollView>
    );
  }
}
