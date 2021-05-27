import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
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
import { setCurrentQuiz } from '../../actions/currentQuizAction';

import NetInfo from "@react-native-community/netinfo";
import FormService from '../../services/form_service';
import uuidv4 from '../../utils/uuidv4';

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
    this._createQuiz(item);
    this.props.navigation.navigate("CreateYourStoryScreen", { title: item.name, form_id: item.id });
  }

  _createQuiz(item) {
    let uuid = uuidv4();
    Quiz.upsert({
      uuid: uuid,
      user_uuid: this.props.currentUser.uuid,
      form_id: item.id,
      quizzed_at: (new Date).toDateString()
    });

    let quiz = Quiz.find(uuid);
    this.props.setCurrentQuiz(quiz);
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
        return alert("no connection");
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
        <FlatList
          data={this.state.forms}
          renderItem={(item, i) => this._renderItem(item.item, i)}
          keyExtractor={item => uuidv4()}
          contentContainerStyle={{padding: 8}}
          onRefresh={ () => this._onRefresh() }
          refreshing={ this.state.isFetching }
        />
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentQuiz: (quiz) => dispatch(setCurrentQuiz(quiz)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(YourStory));
