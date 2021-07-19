import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ToastAndroid,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import CardItem from '../../components/YourDeparture/CardItem';
import Departure from '../../models/Departure';

import CategoryService from '../../services/category_service';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import LoadingIndicator from '../../components/loading_indicator';

class YourDeparture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: Departure.getRoots(),
      isFetching: false,
      loading: true,
      audioPlayer: null,
    };
  }

  componentDidMount() {
    // Departure.deleteAll();
    Departure.seedData(() => this.setState({loading: false}));
  }

  componentWillUnmount() {
    this._clearAudioPlayer();
  }

  _clearAudioPlayer() {
    if (this.state.audioPlayer){
      this.state.audioPlayer.release();
      this.setState({ audioPlayer: null });
    }
  }

  _onPress(item) {
    this._clearAudioPlayer();

    if(!!item.video) {
      return this.props.navigation.navigate("YourDepartureVideoScreen");
    }

    this.props.navigation.navigate("SubCategoryScreen", { title: item.name, parent_id: item.id });
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        item={item}
        backgroundColor={Color.red}
        title={item.name}
        image={item.imageSource}
        audio={item.audio}
        onPress={() => this._onPress(item)}
        audioPlayer={this.state.audioPlayer}
        updateAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
      />
    )
  }

  _onRefresh() {
    this._clearAudioPlayer();
    this.setState({isFetching: true});

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});

        return ToastAndroid.show("សូមភ្ជាប់បណ្តាញអ៊ិនធឺណេតជាមុនសិន!", ToastAndroid.SHORT);
      }

      CategoryService.updateDepartures(() => {
        this.setState({isFetching: false});
      })
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.red} />

        <LoadingIndicator loading={this.state.loading}/>

        { !this.state.loading &&
          <FlatList
            data={this.state.categories}
            renderItem={(item, i) => this._renderItem(item.item, i)}
            keyExtractor={item => item.id}
            contentContainerStyle={{padding: 8, alignSelf: 'stretch'}}
            numColumns={2}
            onRefresh={ () => this._onRefresh() }
            refreshing={ this.state.isFetching }
          />
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(YourDeparture));
