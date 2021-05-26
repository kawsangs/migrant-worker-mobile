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

  _renderAbouts() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 5 }}>
          <Text>អំពី</Text>
        </View>

        <ListItem
          title={"Spotlight Initiative"}
          avata={Images.info}
          onPress={() => this.props.navigation.navigate('AboutScreen', {type: 'spotlight_initiative'})}
        />

        <ListItem
          title={"Safe and Fair App"}
          avata={Images.info}
          onPress={() => this.props.navigation.navigate('AboutScreen', {type: 'safe_and_fair_app'})}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <UserProfile navigation={this.props.navigation}/>
          { this._renderAbouts() }
          { this._renderListMenuItem() }

          <ListItem
            title={"ចាកចេញ"}
            avata={Images.doc}
            onPress={ () => this.props.setCurrentUser(null) }
          />

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
