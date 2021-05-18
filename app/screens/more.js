import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
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

import UserProfile from '../components/More/UserProfile';
import ListItem from '../components/More/ListItem';
import moreItemList from '../db/json/more_items';

import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUserAction';

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
    return (
      <ListItem
        key={index}
        title={item[`title_${i18n.language}`]}
        avata={item.icon}
        onPress={() => {}}
      />
    )
  }

  _renderListMenuItem() {
    return moreItemList.map((section, index) =>
      <View key={index}>
        <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 5 }}>
          <Text>{section[`title_${i18n.language}`]}</Text>
        </View>

        { section.items.map((item, index) => this._renderMenuItem(item, index)) }

        <ListItem
          title={"Logout"}
          avata={Images.doc}
          onPress={ () => this.props.setCurrentUser(null) }
        />
      </View>
    );
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
        { this._renderToolbar() }

        <ScrollView>
          <UserProfile />

          {/* {this._renderChangeLanguage()} */}
          {this._renderListMenuItem()}
          {this._renderVersion()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  appVersion: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(More));
