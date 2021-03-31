import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Icon, Toolbar } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

class YourRightsAndSafety extends Component {
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
        centerElement={this.props.t('YourRightSafetyScreen.HeaderTitle')}
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
        title_en: 'Work Permit',
        title_kh: 'អំពើហិង្សាលើស្រ្តី',
        image: Images.your_right_and_safety_1,
        screenName: 'YourRightsAndSafetyScreen',
        imageList: 'visas',
        fileName: '',
        w: 34,
        h: 45
      },
      {
        title_en: 'Work Permit',
        title_kh: 'ការបៀតបៀនផ្លូវភេទ',
        image: Images.your_right_and_safety_2,
        screenName: 'YourRightsAndSafetyScreen',
        imageList: 'visas',
        fileName: '',
        w: 34,
        h: 45
      },
      {
        title_en: 'Work Permit',
        title_kh: 'សុខភាពរបស់អ្នក',
        image: Images.your_right_and_safety_3,
        screenName: 'YourRightsAndSafetyScreen',
        imageList: 'visas',
        fileName: '',
        w: 34,
        h: 45
      },
      {
        title_en: 'Work Permit',
        title_kh: 'ស្វែងយល់អំពីការកេងប្រវញ្ច័​និងការជួញដូរ',
        image: Images.your_right_and_safety_5,
        screenName: 'YourRightsAndSafetyScreen',
        imageList: 'visas',
        fileName: '',
        w: 34,
        h: 45
      },
      {
        title_en: 'Work Permit',
        title_kh: 'សិទ្ធិរបស់អ្នក និងកិច្ចគាំពារ',
        image: Images.your_right_and_safety_5,
        screenName: 'YourRightsAndSafetyScreen',
        imageList: 'visas',
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
        // onPress={() => this._onPress(item)}
        onPress={() => null}
        activeOpacity={0.8}
        style={[Style.card, { padding: 0 }]}
      >
        <ImageBackground
          source={item.image}
          style={{ flex: 1 }}>
          <View style={[Style.cardContent,
          {
            marginBottom: 0,
            paddingBottom: 0,
            minHeight: 160
          }
          ]}>
            <View style={{ flex: 1 }} />

            <View>
              <PlaySound
                fileName={'register'}
                buttonAudioStyle={{
                  backgroundColor: Color.primary
                }}
                iconStyle={{
                  tintColor: Color.white
                }}
                activePlaying={this.state.activePlaying}
                onPress={(fileName) => this.setState({ activePlaying: fileName })}
                style={{ marginTop: 10, marginRight: 10 }}
              />
            </View>
          </View>
        </ImageBackground>

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

export default withTranslation()(YourRightsAndSafety);

