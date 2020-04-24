import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';

const win = Dimensions.get('window');

export default class Passport extends React.Component {
  state = {};

  _renderImage(image) {
    let containerWdith = win.width - 60;
    let ratio = containerWdith / image.width;
    let imageStyle = {
      width: containerWdith,
      height: image.height * ratio,
    }

    return (
      <View style={Style.card} key={uuidv4()}>
        <Image
          source={Images[image.name]}
          style={imageStyle}
          resizeMode={'contain'} />
      </View>
    );
  }

  _renderImageList() {
    let images = [
      { name: 'simple_passport', width: 252, height: 384 },
      { name: 'diploma_passport', width: 280, height: 394 },
    ];

    return (
      images.map (img => this._renderImage(img))
    );
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          { this._renderImageList() }
        </View>
      </ScrollView>
    );
  }
}
