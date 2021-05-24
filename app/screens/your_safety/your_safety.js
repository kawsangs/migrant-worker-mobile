import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import CardItem from '../../components/YourSafety/CardItem';
import Safety from '../../models/Safety';

class YourSafety extends Component {
  state = { loading: true }

  componentDidMount() {
    // Safety.deleteAll();
    // CategoryImage.deleteAll();
    Safety.seedData(() => this.setState({loading: false}));

    this._initState();
  }

  _initState() {
    this.setState({
      categories: Safety.getRoots(),
      isDownloaded: Safety.isDownloaded(),
    })
  }

  _onPress(item) {
    if(!!item.video) {
      return this.props.navigation.navigate("YourSafetyVideosScreen");
    }

    this.props.navigation.navigate("YourSafetySubCategoryScreen", { title: item.name, parent_id: item.id });
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        title={item.name}
        audio={item.audio}
        image={item.imageSource}
        onPress={() => this._onPress(item)}
      />
    );
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

export default withTranslation()(YourSafety);
