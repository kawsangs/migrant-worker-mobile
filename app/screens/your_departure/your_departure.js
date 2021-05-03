import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import { InjectArray } from '../../utils/math';
import { addStatistic } from '../../utils/statistic';
import { Toolbar } from 'react-native-material-ui';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import uuidv4 from '../../utils/uuidv4';
import CardItem from '../../components/Home/CardItem';
import Departure from '../../models/Departure';

class YourDeparture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: Departure.getAll()
    };
  }

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

  _renderCardItem(item) {
    return (
      <CardItem
        key={uuidv4()}
        item={item}
        onPress={() => this._goTo(item.screenName)}
      />
    )
  }

  _renderCards() {
    let list = this.state.categories;
    let row1 = list.slice(0, 2).map((item) => this._renderCardItem(item));
    let row2 = list.slice(2, 4).map((item) => this._renderCardItem(item));
    let space = <View key={uuidv4()} style={{ width: 16 }}></View>;

    return (
      <View style={[Style.container, { flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: '700' }}>{this.props.t('BeforeYouGoScreen.CheckListForDeparture')}</Text>
          </View>

          <View style={Style.row}>
            { InjectArray(row1, space) }
          </View>

          <View style={{ height: 16 }}></View>

          <View style={Style.row}>
            { InjectArray(row2, space) }
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.red} />

        { this._renderToolbar() }
        { this._renderCards() }
      </View>
    );
  }
}

export default withTranslation()(YourDeparture);
