import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';

class LeafCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: {},
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={[Style.container, { flex: 1, marginBottom: 0 }]}>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withTranslation()(LeafCategory);
