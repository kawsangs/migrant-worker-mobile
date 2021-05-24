import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';
import { autoImageHeight } from '../../utils/image_style';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

const win = Dimensions.get('window');

class CardItem extends Component {
  render() {
    let { item } = this.props;
    let containerWdith = (win.width - 48) / 2 - 50;
    let imageStyle = autoImageHeight(containerWdith, item.imageWidth, item.imageHeight);
    let image = this.props.image || Images.default;
    let title = this.props.title || item[`title_${i18n.language}`];
    let bgColor = this.props.backgroundColor || Color.primary;

    return (
      <TouchableOpacity
        key={uuidv4()}
        style={[Style.card, { flex: 1, marginBottom: 0, padding: 0 }]}
        activeOpacity={0.8}
        { ...this.props }
      >
        <View style={styles.coverSoundIcon}>
          <PlaySound
            buttonAudioStyle={{ backgroundColor: Color.white }}
            iconStyle={{ tintColor: bgColor }}
            filePath={this.props.audio}/>
        </View>

        <View style={[styles.coverImage, { backgroundColor: bgColor }]}>
          <Image source={image} style={{ width: '100%', height: '100%', resizeMode: 'cover', }} />
        </View>

        <View style={styles.cardTitle}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  coverSoundIcon: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
  coverImage: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  cardTitle: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  title: {
    fontFamily: FontFamily.title,
    fontSize: FontSize.small
  },
});

export default withTranslation()(CardItem);
