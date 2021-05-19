import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import { StackActions } from '@react-navigation/native';

class SubCategory extends Component {
  render() {
    let image = this.props.image || Images.default;

    return (
      <TouchableOpacity
        style={[Style.card, { padding: 0 }]}
        activeOpacity={0.8}
        {...this.props}
      >
        <ImageBackground
          source={image}
          style={{ flex: 1 }}>
          <View style={[Style.cardContent,
          {
            marginBottom: 0,
            paddingBottom: 0,
            minHeight: 160
          }
          ]}>

            <View style={{ flex: 1, padding: 14, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <View style={styles.cardID}>
                  <Text style={styles.cardNumber}>{this.props.number}</Text>
                </View>
              </View>

              <View>
                <PlaySound
                  filePath={this.props.audio}
                  buttonAudioStyle={{backgroundColor: Color.red}}
                  iconStyle={{tintColor: Color.white}}/>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={{ flexDirection: 'row', padding: 14 }}>
          <Text style={[styles.title]}>{this.props.title}</Text>
          { !this.props.hideArrow &&
            <Icon name='keyboard-arrow-right' size={24} />
          }

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cardID: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fcd4ce",
    overflow: 'hidden',
  },
  cardNumber: {
    fontWeight: '700',
    fontSize: FontSize.title + 15,
    color: Color.red,
    marginBottom: 5
  },
  title: {
    flex: 1,
    fontFamily: FontFamily.title,
    color: Color.textBlack,
    fontWeight: '700'
  },
});

export default withTranslation()(SubCategory);
