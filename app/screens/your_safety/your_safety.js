import React, { Component } from 'react';
import { FlatList, ToastAndroid } from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import CardItem from '../../components/YourSafety/CardItem';
import Safety from '../../models/Safety';
import NetInfo from "@react-native-community/netinfo";
import CategoryService from '../../services/category_service';
import uuidv4 from '../../utils/uuidv4';
import LoadingIndicator from '../../components/loading_indicator';

class YourSafety extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isFetching: false,
      categories: Safety.getRoots(),
      audioPlayer: null,
    };
  }

  componentDidMount() {
    // Safety.deleteAll();
    Safety.seedData(() => this.setState({loading: false}));
  }

  componentWillUnmount() {
    this._clearAudioPlayer();
  }

  _clearAudioPlayer() {
    if (this.state.audioPlayer) {
      this.state.audioPlayer.release();
      this.setState({ audioPlayer: null });
    }
  }

  _onPress(item) {
    this._clearAudioPlayer();

    if(!!item.video) {
      return this.props.navigation.navigate("YourSafetyVideosScreen");
    }

    this.props.navigation.navigate("YourSafetySubCategoryScreen", { title: item.name, parent_id: item.id });
  }

  _onRefresh() {
    this._clearAudioPlayer();
    this.setState({isFetching: true});

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});

        return ToastAndroid.show("សូមភ្ជាប់បណ្តាញអ៊ិនធឺណេតជាមុនសិន!", ToastAndroid.SHORT);
      }

      CategoryService.updateSafeties(() => {
        this.setState({isFetching: false});
      })
    });
  }

  _renderItem(item, index) {
    return (
      <CardItem
        title={item.name}
        audio={item.audio}
        image={item.imageSource}
        onPress={() => this._onPress(item)}
        onRefresh={ () => this._onRefresh() }
        refreshing={ this.state.isFetching }
        audioPlayer={this.state.audioPlayer}
        updateAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
      />
    );
  }

  render() {
    return (
      <>
        <LoadingIndicator loading={this.state.loading}/>

        { !this.state.loading &&
          <FlatList
            data={this.state.categories}
            renderItem={(item, i) => this._renderItem(item.item, i)}
            keyExtractor={item => uuidv4()}
            contentContainerStyle={{padding: 8}}
            onRefresh={ () => this._onRefresh() }
            refreshing={ this.state.isFetching }
          />
        }
      </>
    );
  }
}

export default withTranslation()(YourSafety);
