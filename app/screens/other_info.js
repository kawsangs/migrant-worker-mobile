import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import Images from '../utils/images';
import { InjectArray } from '../utils/math';
import uuidv4 from '../utils/uuidv4';
import { autoImageHeight } from '../utils/image_style';

const win = Dimensions.get('window');

export default class OtherInfo extends React.Component {
  state = {};

  _renderCard(item) {
    let containerWdith = (win.width - 48) / 2 - 50;
    let imageStyle = autoImageHeight(containerWdith, item.imageWidth, item.imageHeight);

    return (
      <TouchableOpacity
        key={uuidv4()}
        onPress={() => this.props.navigation.navigate(item.screenName)}
        style={[Style.card, {flex: 1, marginBottom: 0}]}
        >
        <View style={{alignItems: 'flex-end'}}>
          <PlaySound
            fileName={item.audioFileName || 'register'}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({activePlaying: fileName})}/>
        </View>

        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Image source={Images[item.iconName]} style={imageStyle} />
        </View>

        <View style={{minHeight: 54}}>
          <Text style={{fontFamily: FontFamily.title}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderCards() {
    let list = [
      { title: 'ចំណាកស្រុកសុវត្ថិភាព ត្រូវមានអ្វីខ្លះ?', iconName: 'safe_migrant', screenName: 'SafeMigrationScreen', imageWidth: '480', imageHeight: '360', audioFileName: '' },
      { title: 'ព័ត៌មានជាអក្សរ', iconName: 'text_info', screenName: 'TextInfoScreen', imageWidth: '300', imageHeight: '372', audioFileName: '' },
      { title: 'សៀវភៅអំពីសេវា', iconName: 'service_directory', screenName: 'ServiceDirectoryScreen', imageWidth: '440', imageHeight: '344', audioFileName: '' },
      { title: 'ព័ត៌មានជាវីដេអូ', iconName: 'video', screenName: 'VideosScreen', imageWidth: '440', imageHeight: '344', audioFileName: '' },
    ];

    let row1 = list.slice(0, 2).map((item) => this._renderCard(item));
    let row2 = list.slice(2, 4).map((item) => this._renderCard(item));

    let space = <View key={uuidv4()} style={{width: 16}}></View>;
    row1 = InjectArray(row1, space);
    row2 = InjectArray(row2, space);

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', flex: 1}}>
          { row1 }
        </View>

        <View style={{height: 16}}></View>

        <View style={{flexDirection: 'row', flex: 1}}>
          { row2 }
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
