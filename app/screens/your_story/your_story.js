import React, { Component } from 'react';
import { View, FlatList, StatusBar, ToastAndroid } from 'react-native';
import { Color } from '../../assets/stylesheets/base_style';
import { withTranslation } from 'react-i18next';

import CardItem from '../../components/YourSafety/CardItem';
import Form from '../../models/Form';
import { connect } from 'react-redux';

import NetInfo from "@react-native-community/netinfo";
import FormService from '../../services/form_service';
import uuidv4 from '../../utils/uuidv4';
import LoadingIndicator from '../../components/loading_indicator';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

class YourStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      forms: Form.getAllYourStory(),
      isFetching: false,
    };
  }

  componentDidMount() {
    // Form.deleteAllWithDependency();
    Form.seedData(() => this.setState({loading: false}));
  }

  _onPress(item) {
    this.props.setCurrentPlayingAudio(null);
    this.props.navigation.navigate("CreateYourStoryScreen", { title: item.name, form_id: item.id });
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        uuid={item.id}
        title={item.name}
        audio={item.audio}
        image={item.imageSource}
        onPress={() => this._onPress(item)}
        buttonAudioStyle={{backgroundColor: Color.white}}
        audioIconColor={Color.pink}
      />
    );
  }

  _onRefresh() {
    this.props.setCurrentPlayingAudio(null);
    this.setState({
      isFetching: true,
    });

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});
        return ToastAndroid.show("សូមភ្ជាប់បណ្តាញអ៊ិនធឺណេតជាមុនសិន!", ToastAndroid.SHORT);
      }

      new FormService().updateForm(() => {
        this.setState({isFetching: false});
      })
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />

        <LoadingIndicator loading={this.state.loading}/>

        { !this.state.loading &&
          <FlatList
            data={this.state.forms}
            renderItem={(item, i) => this._renderItem(item.item, i)}
            keyExtractor={item => uuidv4()}
            contentContainerStyle={{padding: 8}}
            onRefresh={ () => this._onRefresh() }
            refreshing={ this.state.isFetching }
          />
        }
      </View>
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
  mapDispatchToProps,
)(withTranslation()(YourStory));
