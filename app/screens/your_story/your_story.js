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
} from 'react-native';
import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { InjectArray } from '../../utils/math';
import CardItem from '../../components/YourStory/CardItem';

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

  _renderContent() {
    let cards = this.state.forms.map((item, index) => <CardItem key={index} item={item} onPress={() => this._onPress(item)}/>);
    let verticalLine = <View style={styles.verticalLine}><Image source={Images.vertical_line} style={[styles.cardFolder, { tintColor: Color.gray }]} /></View>;

    return (
      <View style={Style.container}>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.testStoryTitle}>{this.props.t('YourStoryScreen.Title')}</Text>
        </View>

        { InjectArray(cards, verticalLine) }
      </View>
    )
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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>

        <View style={{ flex: 1, marginBottom: 0 }}>
          {this._renderContent()}
        </View>
      </ScrollView>
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
    return (
      <View style={{ flex: 1, backgroundColor: "#ecedf1" }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />

        { this.state.isDownloaded && this._renderCards() }
        { !this.state.isDownloaded && this._handleRendingNoData() }
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
