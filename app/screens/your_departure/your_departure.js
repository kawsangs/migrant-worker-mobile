import React, { Component } from 'react';
import {
  View,
  StatusBar,
  FlatList,
  ToastAndroid,
} from 'react-native';

import { Color } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import CardItem from '../../components/YourSafety/CardItem';
import Departure from '../../models/Departure';
import Visit from '../../models/Visit';

import CategoryService from '../../services/category_service';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import LoadingIndicator from '../../components/loading_indicator';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

class YourDeparture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: Departure.getRoots(),
      isFetching: false,
      loading: true,
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
    if (!!this.props.currentPlayingAudio)
      this.props.setCurrentPlayingAudio(null)
  }

  _onPress(item) {
    this._clearAudioPlayer();
    Visit.uploadDepartureDetailVisit(item.id);

    if(!!item.video) {
      return this.props.navigation.navigate("YourDepartureVideoScreen");
    }
    this.props.navigation.navigate("SubCategoryScreen", { title: item.name, parent_id: item.id });
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        uuid={item.uuid}
        backgroundColor={Color.red}
        title={item.name}
        image={item.imageSource}
        audio={item.audio}
        onPress={() => this._onPress(item)}
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
      new CategoryService().syncDepartures(() => this.setState({isFetching: false}));
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.beforeYouGoColor} />

        <LoadingIndicator loading={this.state.loading}/>

        { !this.state.loading &&
          <FlatList
            data={this.state.categories}
            renderItem={(item, i) => this._renderItem(item.item, i)}
            keyExtractor={item => item.id}
            contentContainerStyle={{padding: 8, alignSelf: 'stretch'}}
            onRefresh={ () => this._onRefresh() }
            refreshing={ this.state.isFetching }
          />
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPlayingAudio: state.currentPlayingAudio
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPlayingAudio: (uuid) => dispatch(setCurrentPlayingAudio(uuid))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(YourDeparture));
