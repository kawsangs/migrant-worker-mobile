import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import Images from '../utils/images';
import { addStatistic } from '../utils/statistic';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

import UserProfile from '../components/More/UserProfile';
import ListItem from '../components/More/ListItem';
import moreItemList from '../db/json/more_items';
import OtherList from '../components/More/OtherList';
import AboutList from '../components/More/AboutList';
import AppVersion from '../components/More/AppVersion';

import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUserAction';

class More extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <UserProfile navigation={this.props.navigation}/>
          <AboutList navigation={this.props.navigation}/>
          <OtherList />

          <ListItem
            title={"ចាកចេញ"}
            avata={Images.logout}
            onPress={ () => this.props.setCurrentUser(null) }
          />

          <AppVersion />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

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
