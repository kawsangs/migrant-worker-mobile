import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import Images from '../utils/images';
import uuidv4 from '../utils/uuidv4';
import ImageData from '../data/json/image_list';

const win = Dimensions.get('window');

export default class ImageView extends React.Component {
  state = {};

  _renderImage(image) {
    let containerWdith = win.width - 60;
    let ratio = containerWdith / parseInt(image.width);
    let imageStyle = {
      width: containerWdith,
      height: parseInt(image.height) * ratio,
    }

    return (
      <View style={Style.card} key={uuidv4()}>
        <Image
          source={image.source}
          style={imageStyle}
          resizeMode={'contain'} />
      </View>
    );
  }

  _renderImageList() {
    let imageList = this.props.route.params.imageList || 'passports';
    let images = ImageData[imageList];

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
