import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { FontFamily } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';
import { autoImageHeight } from '../../utils/image_style';
import { getDeviceStyle, isShortWidthScreen } from '../../utils/responsive_util';
import uuidv4 from '../../utils/uuidv4';

class AboutPartnerLogos extends Component {
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

  _renderLogo(logo, containerStyle = {}) {
    let imageStyle = autoImageHeight(logo.containerWidth, logo.width, logo.height);

    return (
      <TouchableOpacity
        key={uuidv4()}
        style={[{ margin: 10 }, containerStyle]}
        onPress={() => this._onPress(logo.url)}
      >
        <Image source={Images[logo.name]} style={imageStyle} />
      </TouchableOpacity>
    )
  }

  _renderSupporters() {
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
          {logos.slice(1, 3).map((logo) => this._renderLogo(logo))}
          <View style={{borderLeftWidth: 1, height: '65%', borderLeftColor: '#c6c6c6', marginHorizontal: isShortWidthScreen() ? 0 : 10}}/>
          {logos.slice(3, 5).map((logo) => this._renderLogo(logo))}
        </View>
      </View>
    )
  }

  _renderTechnical() {
    const containerWidth = getDeviceStyle(222, 150);
    let logos = [
      { name: 'chc_logo', url: '', containerWidth: containerWidth, width: '896', height: '296' },
      { name: 'instedd_logo', url: 'http://ilabsoutheastasia.org/', containerWidth: containerWidth, width: '908', height: '272' },
    ];

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        { this._renderLogo(logos[0], {marginRight: wp('6%')}) }
        { this._renderLogo(logos[1]) }
      </View>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Text style={{fontFamily: FontFamily.title, marginTop: 16, textAlign: 'center'}}>គាំទ្រដោយ</Text>
        { this._renderSupporters()}

        <Text style={{fontFamily: FontFamily.title, marginTop: 36, marginBottom: 10, textAlign: 'center'}}>សហការផលិតដោយ</Text>
        { this._renderTechnical() }
      </React.Fragment>
    )
  }
}

export default AboutPartnerLogos;