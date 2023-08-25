import React, { Component } from 'react';
import {
  Text,
  Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';

import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';

import Departure from '../../models/Departure';
import LeafCategoryAudioPlayer from '../../components/LeafCategory/leafCategoryAudioPlayer';

const tagsStyles = {
  h2: {
    fontFamily: FontFamily.title,
    fontWeight: "400",
    fontSize: 18,
  },
  div: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.small,
    lineHeight: 30,
    marginBottom: 10,
  },
  p: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.small,
    lineHeight: 30,
  },
  li: {
    marginTop: -4
  },
}

let _this = null;

class LeafCategory extends Component {
  constructor(props) {
    super(props);
    _this = this;

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

  render() {
    let image = this.state.category.imageSource || Images.default;

    return (
      <LeafCategoryAudioPlayer
        category={this.state.category}
        image={image}
        iconStyle={{tintColor: Color.white, color: 'black'}}
        iconSize={35}
        progressBarContainerStyle={{width: '100%'}}
      >
        { this._renderTitle() }

        { !!this.state.category.description &&
          <HTML
            source={{ html: this.state.category.description }}
            contentWidth={Dimensions.get('screen').width}
            tagsStyles={tagsStyles}
          />
        }
      </LeafCategoryAudioPlayer>
    )
  }
}

export default withTranslation()(LeafCategory);