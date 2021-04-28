import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { InjectArray } from '../../utils/math';
import uuidv4 from '../../utils/uuidv4';
import { autoImageHeight } from '../../utils/image_style';
import { addStatistic } from '../../utils/statistic';
import { Toolbar } from 'react-native-material-ui';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';


const win = Dimensions.get('window');

class BeforeYouGo extends Component {
  state = {};

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={this.props.t("BeforeYouGoScreen.HeaderTitle")}
        rightElement={'home'}
        onRightElementPress={() => this._goTo('HomeScreen')}
        size={30}
        style={{
          titleText: {
            fontFamily: FontFamily.title,
            textAlign: 'center',
          },
          centerElementContainer: {
            marginLeft: 0
          },
          container: {
            width: '100%',
            backgroundColor: Color.red,
          },
        }}
      />
    );
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
          <Image source={Images[item.iconName]} style={imageStyle} />
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
        title_en: 'Prepare your trip',
        title_kh: 'រៀបចំដំណើរកម្សាន្ត',
        iconName: 'safe_migrant',
        screenName: 'PrepareYourTripScreen',
        imageWidth: '480',
        imageHeight: '360',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Migration',
        title_kh: 'ចំណាកស្រុក',
        iconName: 'text_info',
        screenName: 'PrepareYourTripScreen',
        imageWidth: '300',
        imageHeight: '372',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Coming Home',
        title_kh: 'មកផ្ទះ',
        iconName: 'service_directory',
        screenName: 'PrepareYourTripScreen',
        imageWidth: '440',
        imageHeight: '344',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Video',
        title_kh: 'វីដេអូ',
        iconName: 'video',
        screenName: 'PrepareYourTripScreen',
        imageWidth: '440',
        imageHeight: '344',
        audioFileName: '',
        backgroundColor: Color.red
      },
    ];

    let row1 = list.slice(0, 2).map((item) => this._renderCard(item));
    let row2 = list.slice(2, 4).map((item) => this._renderCard(item));

    let space = <View key={uuidv4()} style={{ width: 16 }}></View>;
    row1 = InjectArray(row1, space);
    row2 = InjectArray(row2, space);

    return (
      <View style={[Style.container, { flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: '700' }}>{this.props.t('BeforeYouGoScreen.CheckListForDeparture')}</Text>
          </View>

          <View style={styles.rowStyle}>
            {row1}
          </View>

          <View style={{ height: 16 }}></View>

          <View style={styles.rowStyle}>
            {row2}
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.red} />
        {this._renderToolbar()}
        {this._renderCards()}
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

export default withTranslation()(BeforeYouGo);