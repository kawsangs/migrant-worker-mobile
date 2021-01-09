import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { Color } from '../assets/stylesheets/base_style';
import { Icon } from 'react-native-material-ui';
import { getVideoId } from '../utils/youtube.js';

export default class Thumbnail extends React.Component {
  static defaultProps = {
    imageHeight: 200,
    imageWidth: Dimensions.get('window').width,
    onPressError: () => { },
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
        style={containerStyle}
        activeOpacity={0.8}
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
                <View style={{
                  backgroundColor: Color.primary,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Icon name='play-arrow' size={30} color={Color.white} iconSet='MaterialIcons' />
                </View>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
