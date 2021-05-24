import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { StackActions } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import Safety from '../../models/Safety';
import CardItem from '../../components/YourSafety/CardItem';
import CategoryImage from '../../models/CategoryImage';

class YourSafetySubCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: Safety.getChildren(props.route.params['parent_id'])
    };
  }

  _onPress(item) {
    if (item.leaf || item.last) {
      if(!CategoryImage.byCategory(item.id).length) {
        return;
      }

      return this.props.navigation.navigate('ImageViewScreen', { title: item.name, category_id: item.id });
    }

    const pushAction = StackActions.push('YourSafetySubCategoryScreen', { title: item.name, parent_id: item.id });
    this.props.navigation.dispatch(pushAction);
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        title={item.name}
        audio={item.audio}
        image={item.imageSource}
        onPress={() => this._onPress(item)}
        buttonAudioStyle={{backgroundColor: Color.primary}}
        audioIconStyle={{tintColor: Color.white}}
        hideArrow={!CategoryImage.byCategory(item.id).length}
      />
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.categories}
        renderItem={(item, i) => this._renderItem(item.item, i)}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 8}}
      />
    );
  }
}

export default withTranslation()(YourSafetySubCategory);


