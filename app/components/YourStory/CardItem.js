import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';

import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

class CardItem extends Component {
  state = {}

  render() {
    const { item } = this.props;

    return (
      <TouchableOpacity
        style={[Style.card, { marginBottom: 10, padding: 15 }]}
        activeOpacity={0.8}
        { ...this.props }>

        <View style={styles.cardContent}>
          <View style={styles.cardIcon}>
            <Image source={Images.folder} style={styles.cardFolder} />
          </View>

          <View style={styles.cardDescription}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubTitle}>{item.question_count} questions</Text>
          </View>

          <View>
            <PlaySound
              filePath={item.audio}
              buttonAudioStyle={{ backgroundColor: Color.pink }}
              iconStyle={{ tintColor: Color.white }}/>
          </View>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <Text style={[styles.title]}>{this.props.t('YourStoryScreen.StartTest')}</Text>
          <Icon name='keyboard-arrow-right' size={24} style={{ color: Color.gray }} />
        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#efefef',
    marginBottom: 10,
    paddingBottom: 10,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.pink,
  },
  cardDescription: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14
  },
  cardFolder: {
    width: 30,
    height: 30,
    tintColor: Color.yellow
  },
  title: {
    flex: 1,
    color: Color.gray,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  testStoryTitle: {
    fontSize: 23,
    fontWeight: '700'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  cardSubTitle: {
    fontSize: 14,
    fontWeight: '700'
  },
});

export default withTranslation()(CardItem);
