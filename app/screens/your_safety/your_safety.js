import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Icon, Toolbar } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

class YourSafety extends Component {
  state = {}

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={this.props.t('YourSafetyScreen.HeaderTitle')}
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
            backgroundColor: Color.primary,
          },
        }}
      />
    );
  }

  _onPress(item) {
    if (item.routeName == 'ImageViewScreen') {
      addStatistic('migration_checklist_view_image', { title: item.title })
    }

    this.props.navigation.navigate(item.screenName, { title: item.title, imageList: item.imageList });
  }

  _renderContent() {
    let list = [
      {
        title_en: 'Your rights & Safety',
        title_kh: 'សិទ្ធិនិងសុវត្ថិភាពរបស់អ្នក',
        image: Images.safe_migrant,
        screenName: 'YourRightsAndSafetyScreen',
        imageList: 'visas',
        fileName: '',
        w: 34,
        h: 45
      },
      {
        title_en: 'Safety planning',
        title_kh: 'ការធ្វើផែនការសុវត្ថិភាព',
        image: Images.safe_migrant,
        screenName: 'SafetyPlanningScreen',
        imageList: 'worker_cards',
        fileName: '',
        w: 34,
        h: 45
      },
      {
        title_en: 'Videos',
        title_kh: 'វីដេអូ ',
        image: Images.safe_migrant,
        screenName: 'YourSafetyVideosScreen',
        imageList: 'worker_cards',
        fileName: '',
        w: 34,
        h: 45
      },
    ];

    return list.map((item, index) => this._renderCard(item, index));
  }

  _renderCard(item, index) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this._onPress(item)}
        activeOpacity={0.8}
        style={[Style.card, { padding: 0 }]}
      >
        <View style={styles.cardContent}>
          <View style={{ width: 46 }} />

          <View style={styles.cardImage}>
            <Image source={item.image} style={styles.cardImageStyle} />
          </View>

          <View>
            <PlaySound
              fileName={'register'}
              buttonAudioStyle={{
                backgroundColor: Color.white
              }}
              iconStyle={{
                tintColor: Color.primary
              }}
              activePlaying={this.state.activePlaying}
              onPress={(fileName) => this.setState({ activePlaying: fileName })}
              style={{ marginTop: 10, marginRight: 10 }}
            />
          </View>
        </View>

        <View style={styles.cardTitle}>
          <Text style={[styles.title]}>{item[`title_${i18n.language}`]}</Text>
          <Icon name='keyboard-arrow-right' size={24} />
        </View>
      </TouchableOpacity>
    )
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._renderToolbar()}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={[Style.container, { flex: 1, marginBottom: 0 }]}>
            {this._renderContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    backgroundColor: Color.primary,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageStyle: {
    width: wp('40'),
    height: wp('40')
  },
  cardTitle: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    fontFamily: FontFamily.title,
    color: Color.textBlack,
    fontWeight: '700'
  },
});

export default withTranslation()(YourSafety);