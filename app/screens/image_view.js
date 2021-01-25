import React from 'react';
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
import uuidv4 from '../utils/uuidv4';
import ImageData from '../data/json/image_list';
import { autoImageHeight } from '../utils/image_style';
import { Toolbar } from 'react-native-material-ui';
import PlaySound from '../components/play_sound';

const win = Dimensions.get('window');

export default class ImageView extends React.Component {
  state = {
    rotation: 0,
    activePlaying: false,
    images: null,
    current_image: null,
  }

  _goTo(screenName) {
    this.props.navigation.navigate(screenName);
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={this.props.route.params.title}
        rightElement={'home'}
        onRightElementPress={() => this._goTo('HomeScreen')}
        size={30}
        style={{
          titleText: {
            fontFamily: FontFamily.title,
            textAlign: 'center',
          },
          centerElementContainer: {
            marginLeft: 0
          },
          container: {
            width: '100%',
            backgroundColor: Color.red,
          },
        }}
      />
    );
  }

  componentDidMount() {
    this._renderImageList()
  }

  _renderImageList() {
    let imageList = this.props.route.params.imageList;
    let image = ImageData[imageList] || [];
    const new_images = [];

    image && image.map(function (img, index) {
      new_images.push({
        ...img,
        index: index,
      })
    })

    new_images && this.setState({
      images: new_images,
      current_image: new_images[0]
    })
  }

  _onPrevClicked = (image) => {
    const index = image.index;

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
    const index = image.index;

    if (index >= this.state.images.length - 1) {
      return null;
    }

    this.setState({
      ...this.state,
      rotation: 0,
      current_image: this.state.images[index + 1],
    });
  };

  _renderImage() {
    let containerWidth = win.width - 60;
    const image = this.state.current_image;

    return (
      <View>
        <View style={styles.viewImageHeader}>
          <TouchableOpacity
            style={styles.prevBtn}
            activeOpacity={0.8}
            onPress={() => this._onPrevClicked(image)}
          >
            <Image
              source={Images.left_arrow}
              style={styles.prevIcon}
              resizeMode={'contain'} />
          </TouchableOpacity>
          <View style={styles.viewImageTitle}>
            <Text style={{ fontWeight: '700' }}>{image && image.title}</Text>
          </View>
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.8}
            onPress={() => this._onNextClicked(image)}
          >
            <Image
              source={Images.next}
              style={styles.nextIcon}
              resizeMode={'contain'} />
          </TouchableOpacity>
        </View>
        <View style={Style.card} key={uuidv4()}>
          {this.state.current_image && <Image
            source={image && image.source}
            style={[autoImageHeight(containerWidth, image.width, (this.state.rotation == 90 || this.state.rotation == 270) ? image.width : image.height), {
              transform: [{ rotate: `${this.state.rotation}deg` }]
            }]}
            resizeMode={'contain'} />}
        </View>
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
          <Text style={styles.buttonRotationText}>{`Rotate ${this.props.route.params.title}`}</Text>
        </View>
        {this._buildButtonAudio('register', true)}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        {this._renderToolbar()}
        <View style={[Style.container, { marginVertical: 0 }]}>
          {this.state.images ? this._renderImage() : null}
          {this._renderButtonRotation()}
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
    flexDirection: 'row'
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
