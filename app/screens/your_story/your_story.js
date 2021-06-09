import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import CardItem from '../../components/YourSafety/CardItem';

import Form from '../../models/Form';
import Quiz from '../../models/Quiz';
import Answer from '../../models/Answer';
import Sidekiq from '../../models/Sidekiq';

import { connect } from 'react-redux';

import NetInfo from "@react-native-community/netinfo";
import FormService from '../../services/form_service';
import uuidv4 from '../../utils/uuidv4';
import LoadingIndicator from '../../components/loading_indicator';

class YourStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      forms: Form.getAll(),
      isFetching: false,
    };
  }

  componentDidMount() {
    // Form.deleteAllWithDependency();
    Form.seedData(() => this.setState({loading: false}));
  }

  _onPress(item) {
    this.props.navigation.navigate("CreateYourStoryScreen", { title: item.name, form_id: item.id });
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        title={item.name}
        audio={item.audio}
        image={item.imageSource}
        onPress={() => this._onPress(item)}
        buttonAudioStyle={{backgroundColor: Color.pink}}
        audioIconStyle={{tintColor: Color.white}}
      />
    );
  }

  _onRefresh() {
    this.setState({isFetching: true});

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});
        return ToastAndroid.show("សូមភ្ជាប់បណ្តាញអ៊ិនធឺណេតជាមុនសិន!", ToastAndroid.SHORT);
      }

      FormService.updateForm(() => {
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


function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(YourStory));
