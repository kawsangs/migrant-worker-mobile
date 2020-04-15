import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';

export default class Agreement extends React.Component {
  state = {};

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          <Text>Agreement</Text>
        </View>
      </ScrollView>
    );
  }
}
