import React, { Component } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import CardItem from '../../components/YourSafety/CardItem';
import Safety from '../../models/Safety';
import Visit from '../../models/Visit';
import NetInfo from "@react-native-community/netinfo";
import CategoryService from '../../services/category_service';
import uuidv4 from '../../utils/uuidv4';
import LoadingIndicator from '../../components/loading_indicator';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

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

  _clearAudioPlayer() {
    this.props.setCurrentPlayingAudio(null);
  }

  _onPress(item) {
    this._clearAudioPlayer();
    Visit.uploadSafetyDetailVisit(item.id, item.name);

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
      new CategoryService().syncSafeties(() => this.setState({isFetching: false}));
    });
  }

  _renderItem(item, index) {
    return (
      <CardItem
        uuid={item.uuid}
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

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPlayingAudio: (uuid) => dispatch(setCurrentPlayingAudio(uuid))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(YourSafety));