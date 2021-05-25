import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import CardItem from '../../components/YourSafety/CardItem';
import Safety from '../../models/Safety';
import NetInfo from "@react-native-community/netinfo";
import CategoryService from '../../services/category_service';

class YourSafety extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isFetching: false,
      categories: Safety.getRoots(),
    };
  }

  componentDidMount() {
    // Safety.deleteAll();
    Safety.seedData(() => this.setState({loading: false}));
  }

  _onPress(item) {
    if(!!item.video) {
      return this.props.navigation.navigate("YourSafetyVideosScreen");
    }

    this.props.navigation.navigate("YourSafetySubCategoryScreen", { title: item.name, parent_id: item.id });
  }

  _onRefresh() {
    this.setState({isFetching: true});

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});
        return alert("no connection");
      }

      CategoryService.updateSafeties(() => {
        this.setState({isFetching: false});
      })
    });
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        title={item.name}
        audio={item.audio}
        image={item.imageSource}
        onPress={() => this._onPress(item)}
        onRefresh={ () => this._onRefresh() }
        refreshing={ this.state.isFetching }
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
        onRefresh={ () => this._onRefresh() }
        refreshing={ this.state.isFetching }
      />
    );
  }
}

export default withTranslation()(YourSafety);
