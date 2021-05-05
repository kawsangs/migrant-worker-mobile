import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import { InjectArray } from '../../utils/math';
import { addStatistic } from '../../utils/statistic';
import { Icon, Toolbar } from 'react-native-material-ui';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import uuidv4 from '../../utils/uuidv4';
import CardItem from '../../components/Home/CardItem';
import Departure from '../../models/Departure';

import CategoryService from '../../services/category_service';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import NoConnection from '../../components/NoConnection';

import * as Progress from 'react-native-progress';

class YourDeparture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: Departure.getRoots(),
      isDownloaded: Departure.isDownloaded(),
      // isDownloaded: false,
      progress: 0,
      total: 1
    };
  }

  componentDidMount() {
    // Departure.deleteAll();
    this._checkConnection();
  }

  _checkConnection() {
    NetInfo.fetch().then(state => {
      this.setState({ isConnected: state.isConnected });
    });

    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={this.props.t("BeforeYouGoScreen.HeaderTitle")}
        rightElement={'home'}
        onRightElementPress={() => this._goTo('HomeScreen')}
        size={30}
        style={{
          titleText: {
            fontFamily: FontFamily.title,
            textAlign: 'center',
          },
          centerElementContainer: {
            marginLeft: 0
          },
          container: {
            width: '100%',
            backgroundColor: Color.red,
          },
        }}
      />
    );
  }

  _renderCardItem(item) {
    let image = !!item.image ? { uri: `file://${item.image}` } : "";

    return (
      <CardItem
        key={uuidv4()}
        item={item}
        backgroundColor={Color.red}
        title={item.name}
        image={image}
        onPress={() => this._goTo(item.screenName)}
      />
    )
  }

  _renderCards() {
    let list = this.state.categories;
    let row1 = list.slice(0, 2).map((item) => this._renderCardItem(item));
    let row2 = list.slice(2, 4).map((item) => this._renderCardItem(item));
    let space = <View key={uuidv4()} style={{ width: 16 }}></View>;

    return (
      <View style={[Style.container, { flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: '700' }}>{this.props.t('BeforeYouGoScreen.CheckListForDeparture')}</Text>
          </View>

          <View style={Style.row}>
            { InjectArray(row1, space) }
          </View>

          <View style={{ height: 16 }}></View>

          <View style={Style.row}>
            { InjectArray(row2, space) }
          </View>
        </View>
      </View>
    );
  }

  _download() {
    CategoryService.downloadDeparture(this._updateTotoal, this._incrementProgress);
    this.setState({total: Departure.getPendingDownload().length + 1});
  }

  _incrementProgress = () => {
    this.setState({progress: this.state.progress + 1});
  }

  _updateTotoal = (total) => {
    this.setState({total: total});
  }

  _renderDownloadButton() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Progress.Bar progress={(this.state.progress / this.state.total).toFixed(2)} width={200} style={{marginBottom: 20}} />

        { false &&
          <View>
            <Text>Departure category: {Departure.getAll().length}</Text>
            <Text>Pending category: {Departure.getPendingDownload().length}</Text>
            <Text>Progress: {this.state.progress / this.state.total}</Text>
          </View>
        }

        <TouchableOpacity onPress={() => this._download()} style={{backgroundColor: Color.primary, padding: 10, borderRadius: 5}}>
          <Text style={{color: '#fff'}}>Download</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _handleRendingNoCategory() {
    if (this.state.isConnected) {
      return this._renderDownloadButton();
    } else {
      return (<NoConnection onPress={() => this._checkConnection()}/>);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.red} />

        { this._renderToolbar() }
        { this.state.isDownloaded && this._renderCards() }
        { !this.state.isDownloaded && this._handleRendingNoCategory() }
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

