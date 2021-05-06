import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';
import { autoImageHeight, autoImageWidth } from '../utils/image_style';
import PlaySound from '../components/play_sound';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import CategoryImage from '../models/CategoryImage';
import Toolbar from '../components/SubCategory/Toolbar';

class ImageView extends Component {
  constructor(props) {
    super(props);

    let imageList = CategoryImage.byCategory(props.route.params.category_id);

    this.state = {
      rotation: 0,
      activePlaying: false,
      images: JSON.parse(JSON.stringify(imageList)),
      current_image: imageList[0],
    };
  }

  componentDidMount() {
    Image.getSize(`file://${this.state.current_image.image}`, (width, height) => {
      this.setState({imageWidth: width, imageHeight: height});
    });
  }

  _onPrevClicked = (image) => {
    let index = this.state.images.findIndex((img) => img.id == image.id);

    if (index <= 0) {
      return null;
    }

    this.setState({
      ...this.state,
      rotation: 0,
      current_image: this.state.images[index - 1],
    });
  };

  _onNextClicked = (image) => {
    let index = this.state.images.findIndex((img) => img.id == image.id);

    if (index >= this.state.images.length - 1) {
      return null;
    }

    this.setState({
      ...this.state,
      rotation: 0,
      current_image: this.state.images[index + 1],
    });
  };

  _renderImageNav() {
    const image = this.state.current_image;

    return (
      <View style={styles.viewImageHeader}>
        <TouchableOpacity
          style={styles.prevBtn}
          activeOpacity={0.8}
          onPress={() => this._onPrevClicked(image)} >

          <Image
            source={Images.left_arrow}
            style={styles.prevIcon}
            resizeMode={'contain'} />
        </TouchableOpacity>

        <View style={styles.viewImageTitle}>
          <Text style={{ fontWeight: '700' }}>{image && image.name}</Text>
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.8}
          onPress={() => this._onNextClicked(image)} >

          <Image
            source={Images.next}
            style={styles.nextIcon}
            resizeMode={'contain'} />
        </TouchableOpacity>
      </View>
    )
  }

  _getImageSize() {
    const { containerHeight, containerWidth, imageWidth, imageHeight } = this.state;

    // Portrait image
    if (imageHeight > imageWidth) {
      if (this.state.rotation == 90 || this.state.rotation == 270) {
        return autoImageHeight(containerWidth, imageWidth, imageWidth);
      }

      return autoImageWidth(containerHeight, imageWidth, imageHeight);
    }

    // Landscape image
    if (this.state.rotation == 90 || this.state.rotation == 270) {
      return autoImageWidth(containerHeight, imageHeight, imageHeight);
    }

    return autoImageHeight(containerWidth, imageWidth, imageHeight);
  }

  _renderImagePreview() {
    let image = {uri: `file://${this.state.current_image.image}`};

    return (
      <View style={[Style.card, {flex: 1, justifyContent: 'center', alignItems: 'center'}]} onLayout={(e) => this.setState({containerHeight: e.nativeEvent.layout.height, containerWidth: e.nativeEvent.layout.width})}>
        { !!this.state.imageWidth &&
          <Image
            source={image}
            style={[this._getImageSize(), { transform: [{ rotate: `${this.state.rotation}deg` }] } ]}
            resizeMode={'contain'} />
        }
      </View>
    );
  }

  _buildButtonAudio(audioFilename, active) {
    return (
      <PlaySound
        style={styles.buttonAudioWrapper}
        buttonAudioStyle={{ backgroundColor: Color.white }}
        iconStyle={{ tintColor: Color.red }}
        fileName={audioFilename || 'register'}
        activePlaying={this.state.activePlaying}
        onPress={(fileName) => this.setState({ activePlaying: fileName })} />
    )
  }

  _rotateImage() {
    this.setState({
      rotation: this.state.rotation >= 360 ? 90 : this.state.rotation + 90
    })
  }

  _renderButtonRotation() {
    return (
      <TouchableOpacity
        onPress={() => this._rotateImage()}
        style={styles.buttonRotation}
        activeOpacity={0.8}
      >
        <View style={styles.viewRotateIcon}>
          <Image
            source={Images.rotate}
            style={styles.rotateIcon}
            resizeMode={'contain'} />
        </View>

        <View style={styles.coverRegisterLabel}>
          <Text style={styles.buttonRotationText}>{this.props.t('ImageViewScreen.Rotate')} {" "} {this.props.route.params.title}</Text>
        </View>
        {this._buildButtonAudio('register', true)}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Toolbar
          navigation={this.props.navigation}
          title={this.props.t('PrepareYourTripScreen.HeaderTitle')}/>

        <View style={[Style.container, { marginVertical: 0, flex: 1 }]}>
          { this._renderImageNav() }
          { this._renderImagePreview() }
          { this._renderButtonRotation() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  coverRegisterLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRotation: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.red,
    flexDirection: 'row',
    marginBottom: 16
  },
  buttonRotationText: {
    color: Color.white,
    fontFamily: FontFamily.title,
    fontWeight: '700'
  },
  buttonAudioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
  },
  viewImageHeader: {
    marginVertical: 20,
    flexDirection: 'row'
  },
  prevBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Color.red,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevIcon: {
    width: 15,
    height: 15,
    tintColor: Color.white
  },
  viewImageTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Color.red,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextIcon: {
    width: 15,
    height: 15,
    tintColor: Color.white
  },
  viewRotateIcon: {
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotateIcon: {
    width: 30,
    height: 30,
    tintColor: Color.white
  }
});

export default withTranslation()(ImageView);
