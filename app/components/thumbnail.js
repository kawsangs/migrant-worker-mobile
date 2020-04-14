import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import { Icon } from 'react-native-material-ui';
import { getVideoId } from '../utils/youtube.js';


export default class Thumbnail extends React.Component {
  static defaultProps = {
    imageHeight: 200,
    imageWidth: Dimensions.get('window').width,
    onPressError: () => {},
    showPlayIcon: true
  };

  constructor(props) {
    super(props);
    this.state = {
      videoId: getVideoId(props.url)
    };

  }

  render() {
    const imageURL = `https://img.youtube.com/vi/${this.state.videoId}/hqdefault.jpg`;
    const {
      imageWidth,
      imageHeight,
      containerStyle,
      iconWrapperStyle,
      showPlayIcon,
      ...props
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        >
        <ImageBackground
          source={{ uri: imageURL }}
          style={[
            styles.imageContainer,
            {
              width: imageWidth,
              height: imageHeight,
            },
          ]}
          {...props}
        >
        {
          showPlayIcon ? (
            <View style={[styles.iconWrapper, iconWrapperStyle]}>
              <Icon name='play-arrow' size={30} color={Color.primary} iconSet='MaterialIcons'/>
            </View>
          ) : (
            null
          )
        }
        </ImageBackground>
      </TouchableOpacity>
    );

  }
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
