import i18n from 'i18next';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
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
import { addStatistic } from '../../utils/statistic';


class SafetyPlanning extends React.Component {
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
        centerElement={this.props.t('SafetyPlanningScreen.HeaderTitle')}
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
        title_en: 'If you have to leave early',
        title_kh: 'ប្រសិនបើអ្នកត្រូវចាកចេញមុនពេលកំណត់',
        screenName: 'AboutScreen',
        fileName: '',
      },
      {
        title_en: 'Things to pack',
        title_kh: 'របស់របរត្រូវខ្ចប់',
        screenName: 'AboutScreen',
        fileName: '',
      },
      {
        title_en: 'Things to know',
        title_kh: 'រឿងដែលត្រូវដឹង',
        screenName: 'AboutScreen',
        fileName: '',
      },
      {
        title_en: 'Further safety strategies',
        title_kh: 'យុទ្ធសាស្ត្រសុវត្ថិភាពបន្ថែម',
        screenName: 'AboutScreen',
        fileName: '',
      },
      {
        title_en: 'Your health',
        title_kh: 'សុខភាព​របស់​អ្នក',
        screenName: 'AboutScreen',
        fileName: '',
      },
      {
        title_en: 'Your rights and protection',
        title_kh: 'សិទ្ធិនិងការការពាររបស់អ្នក',
        screenName: 'AboutScreen',
        fileName: '',
      },
      {
        title_en: 'Other rights and protection',
        title_kh: 'សិទ្ធិនិងការការពារផ្សេងៗ',
        screenName: 'AboutScreen',
        fileName: '',
      },
    ];

    return list.map((item, index) => this._renderCard(item, index));
  }

  _renderCard(item, index) {
    return (
      <TouchableOpacity
        key={index}
        style={[Style.card, { padding: 10 }]}
        onPress={() => this._onPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardIcon}>
            <Image source={Images.info} style={styles.cardInfoIcon} />
          </View>

          <View style={styles.cardDescription}>
            <Text style={{ fontWeight: '700' }}>{item[`title_${i18n.language}`]}</Text>
          </View>

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
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <Text style={[styles.title]}>{this.props.t("SafetyPlanningScreen.ViewDetail")}</Text>
          <Icon name='keyboard-arrow-right' size={24} style={{ color: Color.gray }} />
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
    backgroundColor: Color.primary,
  },
  cardDescription: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14
  },
  cardInfoIcon: {
    width: 30,
    height: 30,
    tintColor: Color.white
  },
  title: {
    flex: 1,
    color: Color.gray,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
});

export default withTranslation()(SafetyPlanning);