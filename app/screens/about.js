import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import { FontFamily } from '../assets/stylesheets/base_style';
import { withTranslation } from 'react-i18next';
import aboutList from '../db/json/abouts';

import AboutPartnerLogos from '../components/About/aboutPartnerLogos';
import AboutSafeAndFairDescription from '../components/About/aboutSafeAndFairDescription';
import AboutSpotlightDescription from '../components/About/aboutSpotlightDescription';

class About extends Component {
  constructor(props) {
    super(props);

    let about = aboutList.filter(o => o.type == this.props.route.params.type)[0];
    this.state = { about: about };

    props.navigation.setParams({title: about.title});
  }

  _renderAppLogoAndName() {
    return (
      <View style={{marginBottom: 15}}>
        <Image source={require('../assets/images/logos/myjourney.png')} style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 15 }} />
        <Text style={{ fontFamily: FontFamily.title, textAlign: 'center' }}>កម្មវិធីអ៊ែប ដំណើរឆ្លងដែនរបស់ខ្ញុំ</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 16}}>
        { this.props.route.params.type == "safe_and_fair_app" && this._renderAppLogoAndName() }

        { this.props.route.params.type == "safe_and_fair_app" ?
            <AboutSafeAndFairDescription/>
          :
            <AboutSpotlightDescription/>
        }

        <AboutPartnerLogos />
      </ScrollView>
    );
  }
}

export default withTranslation()(About);