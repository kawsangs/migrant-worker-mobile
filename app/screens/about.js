import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';
import uuidv4 from '../utils/uuidv4';
import { autoImageHeight } from '../utils/image_style';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import aboutList from '../db/json/abouts';

class About extends Component {
  constructor(props) {
    super(props);

    let about = aboutList.filter(o => o.type == this.props.route.params.type)[0];
    this.state = { about: about };

    props.navigation.setParams({title: about.title});
  }

  _onPress(url) {
    if (!url) { return; }

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
      }
    });
  }

  _renderLogo(logo) {
    let imageStyle = autoImageHeight(logo.containerWidth, logo.width, logo.height);

    return (
      <TouchableOpacity
        key={uuidv4()}
        style={{ margin: 10 }}
        onPress={() => this._onPress(logo.url)}>
        <Image source={Images[logo.name]} style={imageStyle} />
      </TouchableOpacity>
    )
  }

  _renderDescription() {
    return (
      <Text style={{ textAlign: 'justify' }}>
        { this.state.about.description }
      </Text>
    )
  }

  _renderCollaborations() {
    let logos = [
      { name: 'unwomen', url: '', containerWidth: '194', width: '247', height: '70' },
      { name: 'chc_logo', url: '', containerWidth: '212', width: '896', height: '296' },
    ];

    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        { logos.map((logo) => this._renderLogo(logo)) }
      </View>
    )
  }

  _renderFunders() {
    let logos = [
      { name: 'spotlight', url: '', containerWidth: '260', width: '2560', height: '1384' },
      { name: 'eu', url: '', containerWidth: '70', width: '600', height: '401' },
      { name: 'undp', url: '', containerWidth: '65', width: '910', height: '784' },
      { name: 'global_support', url: '', containerWidth: '60', width: '900', height: '939' },
      { name: 'gender_equality', url: '', containerWidth: '50', width: '1080', height: '1080' },
    ];

    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        { this._renderLogo(logos[0])}

        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: -10 }}>
          {logos.slice(1, 5).map((logo) => this._renderLogo(logo))}
        </View>
      </View>
    )
  }

  _renderTechnical() {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        { this._renderLogo({ name: 'instedd_logo', url: '', containerWidth: '260', width: '908', height: '272' }) }
      </View>
    )
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 16}}>
        { this._renderDescription() }

        <Text style={{ fontFamily: FontFamily.title, marginTop: 16, textAlign: 'center' }}>ក្រោមជំនួយថវិកាដោយ</Text>
        { this._renderFunders()}

        <Text style={{fontFamily: FontFamily.title, marginTop: 16, marginBottom: 10, textAlign: 'center'}}>សហការផលិតដោយ</Text>
        { this._renderCollaborations() }

        <Text style={{fontFamily: FontFamily.title, marginTop: 16, marginBottom: 10, textAlign: 'center'}}>ក្រោមជំនួយបច្ចេកទេសដោយ</Text>
        { this._renderTechnical() }
      </ScrollView>
    );
  }
}

export default withTranslation()(About);
