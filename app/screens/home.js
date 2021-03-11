import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';

import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import Images from '../utils/images';
import { InjectArray } from '../utils/math';
import uuidv4 from '../utils/uuidv4';
import { autoImageHeight } from '../utils/image_style';
import { addStatistic } from '../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

const win = Dimensions.get('window');

class Home extends Component {
  state = {};

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderCard(item) {
    let containerWdith = (win.width - 48) / 2 - 50;
    let imageStyle = autoImageHeight(containerWdith, item.imageWidth, item.imageHeight);

    return (
      <TouchableOpacity
        key={uuidv4()}
        onPress={() => this._goTo(item.screenName)}
        style={[Style.card, { flex: 1, marginBottom: 0, padding: 0 }]}
        activeOpacity={0.8}
      >
        <View style={styles.coverSoundIcon}>
          <PlaySound
            buttonAudioStyle={{ backgroundColor: Color.white }}
            iconStyle={{ tintColor: item.backgroundColor || Color.primary }}
            fileName={item.audioFileName || 'register'}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({ activePlaying: fileName })} />
        </View>

        <View style={[styles.coverImage, { backgroundColor: item.backgroundColor || Color.primary }]}>
          <Image source={Images[item.iconName]} style={{ width: '100%', height: '100%', resizeMode: 'cover', }} />
        </View>

        <View style={styles.cardTitle}>
          <Text style={styles.title}>{item[`title_${i18n.language}`]}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderCards() {
    let list = [
      {
        title_en: 'Before you go',
        title_kh: 'មុនចាកចេញ',
        iconName: 'before_you_go',
        screenName: 'BeforeYouGoScreen',
        imageWidth: '480',
        imageHeight: '360',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Your Safety',
        title_kh: 'សុវត្ថភាពរបស់អ្នក',
        iconName: 'your_safety',
        screenName: 'YourSafetyScreen',
        imageWidth: '300',
        imageHeight: '372',
        audioFileName: '',
        backgroundColor: Color.primary
      },
      {
        title_en: 'Looking for help?',
        title_kh: 'ស្វែងរកជំនួយ?',
        iconName: 'looking_for_help',
        screenName: 'LookingForHelpScreen',
        imageWidth: '440',
        imageHeight: '344',
        audioFileName: '',
        backgroundColor: Color.yellow
      },
      {
        title_en: 'Your Story',
        title_kh: 'រឿងរបស់អ្នក',
        iconName: 'your_story',
        screenName: 'YourStoryScreen',
        imageWidth: '440',
        imageHeight: '344',
        audioFileName: '',
        backgroundColor: Color.pink
      },
    ];

    let row1 = list.slice(0, 2).map((item) => this._renderCard(item));
    let row2 = list.slice(2, 4).map((item) => this._renderCard(item));

    let space = <View key={uuidv4()} style={{ width: 16 }}></View>;
    row1 = InjectArray(row1, space);
    row2 = InjectArray(row2, space);

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.rowStyle}>
          {row1}
        </View>

        <View style={{ height: 16 }}></View>

        <View style={styles.rowStyle}>
          {row2}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={[Style.container, { flex: 1 }]}>
        { this._renderCards()}
      </View>
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
    paddingHorizontal: 14,
    paddingVertical: 14
  },
  title: {
    fontFamily: FontFamily.title,
    fontWeight: '700'
  },
  rowStyle: {
    flexDirection: 'row',
    flex: 1
  }
});

export default withTranslation()(Home);