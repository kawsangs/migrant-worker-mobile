import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import * as Progress from 'react-native-progress';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';

import Departure from '../../models/Departure';

import SoundPlayer from '../../components/sound_player';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const imageWidth = screenWidth * 0.6;

class LeafCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: Departure.find(props.route.params['parent_id']),
    };
  }

  _renderTitle() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{fontFamily: FontFamily.title, fontSize: 18, textAlign: 'center'}}>
          {this.state.category.name}
        </Text>
        <View style={{maxHeight: screenHeight * 0.2, borderWidth: 0,}}>
          <ScrollView>
            <Text style={{fontSize: FontSize.small, textAlign: 'center'}}>
              {this.state.category.description}
            </Text>
          </ScrollView>
        </View>
      </View>
    )
  }

  _renderPlayAudio() {
    return (
      <SoundPlayer
        filePath={this.state.category.audio}
        containerStyle={{flex: 1}}
        iconStyle={{tintColor: Color.white, color: 'black'}}
        iconSize={35}
        progressBarContainerStyle={{width: imageWidth + 20}}
      />
    )
  }

  render() {
    let image = this.state.category.imageSource || Images.default;

    return (
      <View style={[Style.container, { flex: 1, marginBottom: 0, borderWidth: 0 }]}>
        <ImageBackground
          source={image}
          style={[styles.cateImage]}
          resizeMode='contain'
        />
        { this._renderTitle() }

        { this._renderPlayAudio() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cateImage: {
    minHeight: imageWidth,
    width: imageWidth,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
});

export default withTranslation()(LeafCategory);
