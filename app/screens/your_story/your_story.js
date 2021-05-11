import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { addStatistic } from '../../utils/statistic';
import ProgressCircle from 'react-native-progress-circle';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { InjectArray } from '../../utils/math';
import CardItem from '../../components/YourStory/CardItem';
import Toolbar from '../../components/SubCategory/Toolbar';
import Form from '../../models/Form';
import * as Progress from 'react-native-progress';
import NetInfo from "@react-native-community/netinfo";
import NoConnection from '../../components/NoConnection';
import FormService from '../../services/form_service';

class YourStory extends Component {
  state = {}

  componentDidMount() {
    // Form.deleteAllWithDependency();
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

  _renderToolbar() {
    return(
      <Toolbar
        title={this.props.t('YourStoryScreen.HeaderTitle')}
        navigation={this.props.navigation}
        backgroundColor={Color.pink} />
    )
  }

  _download() {
    this.setState({progress: 0});

    FormService.downloadForm(this._updateTotoal, this._incrementProgress);
  }

  _incrementProgress = () => {
    let num = this.state.progress + 1
    this.setState({progress: num});

    console.log("num: ----", num)
    console.log("progress", this._getProgress())

    if (num == this.state.total) {
      this._initState();
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

  _getProgress() {
    if (!!this.state.total) {
      return ((this.state.progress || 0 ) / this.state.total).toFixed(2);
    } else {
      return 0;
    }
  }

  _onPress(item) {
    if (item.routeName == 'ImageViewScreen') {
      addStatistic('migration_checklist_view_image', { title: item[`title_${i18n.language}`] })
    }

    this.props.navigation.navigate("CreateYourStoryScreen", { title: item.name, form_id: item.id });
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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#ecedf1" }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />

        { this._renderToolbar() }
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

export default withTranslation()(YourStory);
