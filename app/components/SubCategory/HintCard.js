import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import CustomAudioPlayerComponent from '../../components/shared/CustomAudioPlayerComponent';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

class HintCard extends Component {
  getTotalItem() {
    switch (this.props.totalItem) {
      case 1:
        return '១';
      case 2:
        return '២';
      case 3:
        return '៣';
      case 4:
        return '៤';
      case 5:
        return '៥';
      case 6:
        return '៦';
      case 7:
        return '៧';
      case 8:
        return '៨';
      case 9:
        return '៩';
      case 10:
        return '១០';
      default:
        return this.props.totalItem;
    }
  }

  render() {
    return (
      <View style={[Style.card, { maxHeight: 150, padding: 0, backgroundColor: Color.beforeYouGoColor }]}>
        <ImageBackground
          source={this.props.image}
          style={{ width: '100%', height: '100%', resizeMode: "cover"}}>

          <View style={[Style.cardContent, styles.mainCardContent]}>
            <View style={{ paddingRight: 8, justifyContent: "center" }}>
              <Text style={styles.mainCardNumber}>{this.getTotalItem()}</Text>
            </View>

            <View style={{ flex: 1, justifyContent: "center", marginTop: -6}}>
              <Text style={styles.mainCardLabel}>{this.props.label}</Text>
            </View>

            <View style={{ marginLeft: 20 }}>
              <CustomAudioPlayerComponent
                itemUuid='hint-card'
                audio={this.props.audio}
                buttonStyle={{backgroundColor: Color.white}}
                iconStyle={{color: Color.beforeYouGoColor}}
                rippled={true}
              />
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
    fontSize: FontSize.title + 60,
    color: Color.white,
  },
  mainCardLabel: {
    fontSize: FontSize.hintTitle,
    fontFamily: FontFamily.title,
    color: Color.white,
  },
});

export default withTranslation()(HintCard);
