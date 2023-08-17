import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

import { StackActions } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import Safety from '../../models/Safety';
import CardItem from '../../components/YourSafety/CardItem';

class YourSafetySubCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: Safety.getChildren(props.route.params['parent_id']),
      audioPlayer: null,
    };
  }

  _onPress(item) {
    if (this.state.audioPlayer) {
      this.state.audioPlayer.release();
      this.setState({ audioPlayer: null });
    }

    if (item.leaf) {
      return this.props.navigation.navigate("YourSafetyLeafCategoryScreen", {title: item.name, parent_id: item.id});
    }

    const pushAction = StackActions.push('YourSafetySubCategoryScreen', { title: item.name, parent_id: item.id });
    this.props.navigation.dispatch(pushAction);
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        uuid={item.uuid}
        title={item.name}
        audio={item.audio}
        image={item.imageSource}
        onPress={() => this._onPress(item)}
        audioPlayer={this.state.audioPlayer}
        updateAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
        audioButtonBackground={Color.primary}
        audioIconColor={Color.white}
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


