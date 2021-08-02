import React, { Component } from 'react';
import { View, Text, Share } from 'react-native';

import Images from '../../utils/images';
import { addStatistic } from '../../utils/statistic';
import i18n from 'i18next';
import TranslationHelper from '../../translations';
import { withTranslation } from 'react-i18next';

import ListItem from './ListItem';

class AboutList extends Component {
  render() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 5 }}>
          <Text>អំពី</Text>
        </View>

        <ListItem
          title={"អំពីគំនិតផ្តួចផ្តើម ស្ពតឡៃត៍"}
          avata={Images.info}
          onPress={() => this.props.navigation.navigate('AboutScreen', {type: 'spotlight_initiative'})}
        />

        <ListItem
          title={"អំពីអ៊ែប ដំណើរឆ្លងដែនរបស់ខ្ញុំ"}
          avata={Images.info}
          onPress={() => this.props.navigation.navigate('AboutScreen', {type: 'safe_and_fair_app'})}
        />
      </View>
    );
  }
}

export default withTranslation()(AboutList);
