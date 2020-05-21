import React from 'react';
import {
  View,
  Image,
  Dimensions
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';
import uuidv4 from '../utils/uuidv4';
import ImageData from '../data/json/image_list';
import { autoImageHeight } from '../utils/image_style';
import CollapsibleNavbar from '../components/collapsible_navbar';

const win = Dimensions.get('window');

export default class ImageView extends React.Component {
  _renderImage(image) {
    let containerWidth = win.width - 60;
    let imageStyle = autoImageHeight(containerWidth, image.width, image.height);

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
    let imageList = this.props.route.params.imageList;
    let images = ImageData[imageList] || [];

    return (
      images.map (img => this._renderImage(img))
    );
  }

  render() {
    return (
      <CollapsibleNavbar
        options={{
          title: this.props.route.params.title,
          bodyContent: this._renderImageList()
        }}
      />
    );
  }
}
