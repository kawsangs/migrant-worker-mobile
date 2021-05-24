import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

class HintCard extends Component {
  render() {
    return (
      <View style={[Style.card, { maxHeight: 150, padding: 0, backgroundColor: Color.red }]}>
        <ImageBackground
          source={this.props.image}
          style={{ width: '100%', height: '100%', resizeMode: "cover"}}>

          <View style={[Style.cardContent, styles.mainCardContent]}>
            <View style={{ marginRight: 10, paddingHorizontal: 10, justifyContent: "center" }}>
              <Text style={styles.mainCardNumber}>{this.props.totalItem}</Text>
            </View>

            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.mainCardLabel}>{this.props.label}</Text>
            </View>

            <View style={{ marginLeft: 20 }}>
              <PlaySound
                filePath={this.props.audio}
                buttonAudioStyle={{backgroundColor: Color.red}}
                iconStyle={{tintColor: Color.white}}/>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainCardContent: {
    flex: 1,
    padding: 14,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  mainCardNumber: {
    fontFamily: FontFamily.title,
    fontSize: FontSize.title + 30,
    color: Color.white,
  },
  mainCardLabel: {
    fontSize: FontSize.hintTitle,
    fontFamily: FontFamily.title,
    color: Color.white,
  },
});

export default withTranslation()(HintCard);
