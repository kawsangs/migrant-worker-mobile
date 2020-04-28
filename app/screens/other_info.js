import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import Images from '../utils/images';

export default class OtherInfo extends React.Component {
  state = {};

  _renderCard(title, image, screenName, fileName='register') {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(screenName)}
        style={[Style.card, {flex: 1, marginBottom: 0}]}
        >
        <View style={{alignItems: 'flex-end'}}>
          <PlaySound
            fileName={fileName}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({activePlaying: fileName})}/>
        </View>

        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Image source={Images[image]} style={{width: '80%', height: '63%'}} />
        </View>

        <View style={{minHeight: 54}}>
          <Text style={{fontFamily: FontFamily.title}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderCards() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', flex: 1}}>
          {this._renderCard('ចំណាកស្រុកសុវត្ថិភាព ត្រូវមានអ្វីខ្លះ?', 'safe_migrant', 'SafeMigrationScreen')}

          <View style={{width: 16}}></View>

          {this._renderCard('ព័ត៌មានជាអក្សរ', 'text_info', 'TextInfoScreen')}
        </View>

        <View style={{height: 16}}></View>

        <View style={{flexDirection: 'row', flex: 1}}>
          {this._renderCard('សៀវភៅអំពីសេវា', 'service_directory', 'ServiceDirectoryScreen')}

          <View style={{width: 16}}></View>

          {this._renderCard('ព័ត៌មានជាវីដេអូ', 'video', 'VideosScreen')}
        </View>
      </View>

    );
  }

  render() {
    return (
        <View style={[Style.container, {flex: 1}]}>
          <Text style={{marginBottom: 12}}>ស្វែងរកព័ត៌មានខាងក្រោម</Text>
          { this._renderCards() }
        </View>
    );
  }
}
