import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import Toolbar from '../../components/SubCategory/Toolbar';
import CardItem from '../../components/SubCategory/CardItem';
import HintCard from '../../components/SubCategory/HintCard';
import ArrowDown from '../../components/SubCategory/ArrowDown';
import Departure from '../../models/Departure';
import Images from '../../utils/images';
import CategoryImage from '../../models/CategoryImage';

class SubCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: Departure.getChildren(props.route.params['parent_id'])
    };
  }

  _renderToolbar() {
    return (
      <Toolbar
        navigation={this.props.navigation}
        title={this.props.t('PrepareYourTripScreen.HeaderTitle')}
      />
    );
  }

  _renderContent() {
    return this.state.categories.map((item, index) => this._renderCard(item, index));
  }

  _onPress(item) {
    if (item.leaf || item.last) {
      if(!CategoryImage.byCategory(item.id).length) {
        return;
      }

      return this.props.navigation.navigate('ImageViewScreen', { title: item.name, category_id: item.id });
    }

    const pushAction = StackActions.push('SubCategoryScreen', { parent_id: item.id });
    this.props.navigation.dispatch(pushAction);
  }

  _renderCard(item, index) {
    let image = !!item.image ? { uri: `file://${item.image}` } : "";

    return (
      <CardItem
        key={index}
        onPress={() => this._onPress(item)}
        title={item.name}
        image={image}
        number={index + 1}
        hideArrow={!CategoryImage.byCategory(item.id).length}
      />
    )
  }

  _renderHintCard() {
    return (
      <HintCard
        totalItem={this.state.categories.length}
        label={this.props.t('PrepareYourTripScreen.Descriptions')}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        { this._renderToolbar() }

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>

          <View style={[Style.container, { flex: 1, marginBottom: 0 }]}>
            {this._renderHintCard()}

            <ArrowDown />

            {this._renderContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withTranslation()(SubCategory);
