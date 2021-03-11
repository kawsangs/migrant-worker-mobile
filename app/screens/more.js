import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import { Toolbar } from 'react-native-material-ui';
import Images from '../utils/images';
import { addStatistic } from '../utils/statistic';
import i18n from 'i18next';
import TranslationHelper from '../translations';
import { withTranslation } from 'react-i18next';

class More extends Component {

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderToolbar() {
    return (
      <Toolbar
        centerElement={this.props.t('MoreScreen.More')}
        rightElement={'home'}
        onRightElementPress={() => this._goTo('HomeScreen')}
        size={30}
        style={{
          titleText: {
            fontFamily: FontFamily.title,
            textAlign: 'center',
          },
          container: {
            width: '100%',
          }
        }}
      />
    );
  }

  _renderUserProfile() {
    return (
      <TouchableOpacity style={[Style.boxShadow, styles.profileStyle]}
        // onPress={() => this._goTo('ProfileScreen')}
        activeOpacity={0.8}
      >
        <View style={styles.profileImageWrapper}>
          <Image source={Images.female} style={styles.profileImage} />
        </View>
        <View style={styles.profileDescription}>
          <Text style={styles.userName}>Dara</Text>
          <Text style={styles.userEditText}>{this.props.t('MoreScreen.Edit')}</Text>
        </View>
        <View>
          <Image source={Images.next} style={styles.nextIcon} />
        </View>
      </TouchableOpacity>
    )
  }

  _renderChangeLanguage() {
    return (
      <TouchableOpacity
        style={[Style.boxShadow, styles.menuItem, { marginBottom: 16 }]}
        onPress={null}
        activeOpacity={0.8}
      >
        <View style={styles.menuIconWrapper}>
          <Image
            source={Images.info}
            style={styles.menuIcon} />
        </View>
        <View style={styles.menuTitleWrapper}>
          <Text style={styles.menuTextTitle}>{'English'}</Text>
        </View>
        <View>
          <Image
            source={Images.en}
            style={{
              width: 48,
              height: 25,
            }} />
        </View>
      </TouchableOpacity>
    )
  }

  _renderMenuItem(item, index) {
    let lang = i18n.language == 'kh'? 'en' : 'kh';
    return (
      <TouchableOpacity
        style={[Style.boxShadow, styles.menuItem, { marginBottom: index == 0 ? 16 : 0, }]}
        key={index}
        onPress={() => item.routeName ? this._goTo(item.routeName) : null}
        activeOpacity={0.8}
      >
        <View style={styles.menuIconWrapper}>
          <Image
            source={item.icon}
            style={styles.menuIcon} />
        </View>
        <View style={styles.menuTitleWrapper}>
          <Text style={styles.menuTextTitle}>{this.props.t(`MoreScreen.${item.title}`)}</Text>
        </View>
        <View>
          {index == 0 ? <TouchableOpacity
            style={Style.boxShadow}
            onPress={() => TranslationHelper.changeLanguage(lang)}
            activeOpacity={0.8}
          ><Image source={i18n.language === 'kh' ? Images.kh : Images.en} style={{ width: 50, height: 27 }} /></TouchableOpacity> : <Image source={Images.next} style={styles.nextIcon} />}
        </View>
      </TouchableOpacity>
    )
  }

  _renderListMenuItem() {
    let list = [
      { title: 'AboutUs', icon: Images.info, routeName: 'AboutScreen' },
      { title: 'ShareApp', icon: Images.share, routeName: '' },
      { title: 'PrivacyPolicy', icon: Images.doc, routeName: '' },
      { title: 'TermsConditions', icon: Images.doc, routeName: '' },
    ];

    return list.map((item, index) => this._renderMenuItem(item, index));
  }

  _renderVersion() {
    return (
      <View style={styles.appVersion}>
        <Text>{this.props.t("MoreScreen.AppVersion")}: v1.0.0</Text>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this._renderToolbar()}
        {this._renderUserProfile()}
        {/* {this._renderChangeLanguage()} */}
        {this._renderListMenuItem()}
        {this._renderVersion()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  profileStyle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white
  },
  profileImageWrapper: {
    // borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    // borderWidth: 1,
    borderColor: 'red'
  },
  profileDescription: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    // borderWidth: 1,
    marginLeft: 16
  },
  userName: {
    fontSize: 18,
    fontWeight: '700'
  },
  userEditText: {
    color: Color.gray
  },
  nextIcon: {
    width: 15,
    height: 15,
    tintColor: Color.gray
  },
  menuItem: {
    // borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderBottomWidth: 1,
    borderBottomColor: Color.border
  },
  menuIconWrapper: {
    // borderWidth: 1,
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: Color.white
  },
  menuTitleWrapper: {
    flex: 1,
    marginLeft: 16
  },
  menuTextTitle: {
    fontSize: 16,
    fontWeight: '700'
  },
  appVersion: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
    marginTop: 20
  }
});

export default withTranslation()(More);