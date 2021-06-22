import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import * as Progress from 'react-native-progress';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';

import Departure from '../../models/Departure';

import SoundPlayer from '../../components/sound_player';

const screenHeight = Dimensions.get('screen').height;

const tagsStyles = {
  h2: {
    fontFamily: FontFamily.title,
    fontWeight: "400",
    fontSize: 18
  },
  div: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.body
  },
  li: {
    marginRight: 10
  }
}

class LeafCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: Departure.find(props.route.params['parent_id']),
    };
  }

  _renderTitle() {
    return (
      <Text style={{fontFamily: FontFamily.title, fontSize: 18, textAlign: 'center', marginBottom: 25}}>
        {this.state.category.name}
      </Text>
    )
  }

  _renderPlayAudio() {
    return (
      <SoundPlayer
        filePath={this.state.category.audio}
        iconStyle={{tintColor: Color.white, color: 'black'}}
        iconSize={35}
        progressBarContainerStyle={{width: '100%'}}
      />
    )
  }

  render() {
    let image = this.state.category.imageSource || Images.default;

    const source = {
      html: `<p style="font-size: 1.2rem; padding: 0 10px;">
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. 
      </p>
      <p style="color: purple; padding: 0 10px;">
        Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>`
    };

    return (
      <View style={[Style.container, { flex: 1, marginBottom: 0 }]}>
        <ImageBackground
          source={image}
          style={[styles.cateImage]}
          resizeMode='contain'
        />

        { this._renderPlayAudio() }

        {/* <ScrollView style={{flex:1}}> */}
          { this._renderTitle() }

          {/* { !!this.state.category.description && */}
            <RenderHtml
              // source={{html: this.state.category.description}}
              source={source}
              contentWidth={Dimensions.get('screen').width}
              tagsStyles={tagsStyles}
            />
          {/* } */}
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cateImage: {
    minHeight: 160,
    width: '100%',
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
