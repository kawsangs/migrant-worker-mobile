import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { InjectArray } from '../../utils/math';
import CardItem from '../../components/YourSafety/CardItem';

import Form from '../../models/Form';
import Quiz from '../../models/Quiz';

import { connect } from 'react-redux';
import { setCurrentQuiz } from '../../actions/currentQuizAction';

import * as Progress from 'react-native-progress';
import NetInfo from "@react-native-community/netinfo";
import NoConnection from '../../components/NoConnection';
import FormService from '../../services/form_service';
import uuidv4 from '../../utils/uuidv4';

class YourStory extends Component {
  state = { loading: true };

  componentDidMount() {
    // Form.deleteAllWithDependency();
    Form.seedData(() => this.setState({loading: false}));
    this._initState();
    this._checkConnection();
  }

  _initState() {
    this.setState({
      forms: Form.getAll(),
      isDownloaded: Form.isDownloaded(),
    })
  }

  _checkConnection() {
    NetInfo.fetch().then(state => {
      this.setState({ isConnected: state.isConnected });
    });

    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  _download() {
    this.setState({progress: 0});

    FormService.downloadForm(this._updateTotoal, this._incrementProgress);
  }

  _incrementProgress = () => {
    let num = this.state.progress + 1;
    this.setState({progress: num});

    // When progress reach 100%, let user see the full progress before hiding it.
    if (num == this.state.total) {
      setTimeout(() => {
        this._initState();
      }, 1000);
    }
  }

  _updateTotoal = (total) => {
    this.setState({total: total});
  }

  _getProgress() {
    if (!!this.state.total && !!this.state.progress) {
      return (this.state.progress/this.state.total).toFixed(2);
    } else {
      return 0;
    }
  }

  _renderDownloadButton() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        { this.state.progress >= 0 && <Progress.Bar progress={this._getProgress()} width={200} style={{marginBottom: 20}} /> }

        { true &&
          <View>
            <Text>Form: {Form.getAll().length}</Text>
            <Text>Pending download: {Form.getPendingDownload().length}</Text>
            <Text>Progress: {this._getProgress()}</Text>
          </View>
        }

        <TouchableOpacity onPress={() => this._download()} style={{backgroundColor: Color.primary, padding: 10, borderRadius: 5}}>
          <Text style={{color: '#fff'}}>Download</Text>
        </TouchableOpacity>
      </View>
    )
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

  _handleRendingNoData() {
    if (this.state.isConnected) {
      return this._renderDownloadButton();
    } else {
      return (<NoConnection onPress={() => this._checkConnection()}/>);
    }
  }

  _renderCards() {
    return (
      <FlatList
        data={this.state.forms}
        renderItem={(item, i) => this._renderItem(item.item, i)}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 8}}
      />
    )
  }

  _renderLoading() {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <ActivityIndicator />
      </View>
    )
  }

  render() {
    if (this.state.loading) {
      return this._renderLoading();
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#ecedf1" }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />

        { this._renderCards() }
        { false && this._handleRendingNoData() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardFolder: {
    width: 30,
    height: 30,
    tintColor: Color.yellow
  },
  testStoryTitle: {
    fontSize: 23,
    fontWeight: '700'
  },
  verticalLine: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10
  },
});


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
