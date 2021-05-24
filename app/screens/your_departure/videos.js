import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Thumbnail from '../../components/thumbnail';
import videoList from '../../data/json/videos';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { getVideoId } from '../../utils/youtube';
import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';
import { Icon, Toolbar } from 'react-native-material-ui';
import LoadingIndicator from '../../components/loading_indicator';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

class Videos extends Component {
  state = {
    videos: videoList,
    loading: true
  };

  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.setState({ isConnected: state.isConnected, loading: false });
    });

    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderNoInternetConnection() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='info-outline' color='#111' size={24} style={{ marginRight: 8 }} iconSet='MaterialIcons' />
          <Text>{this.props.t('InternetConnection.NoInternetConnection')}</Text>
        </View>
        <Text>{this.props.t('InternetConnection.PleaseRetry')}</Text>

        { this.state.showLoading && <ActivityIndicator size="small" />}

        <View style={{ marginTop: 20 }}>
          <Button title={this.props.t('InternetConnection.PleaseRetry')} onPress={() => this._retryConnection()} />
        </View>
      </View>
    )
  }

  _retryConnection() {
    this.setState({ showLoading: true })

    NetInfo.fetch().then(state => {
      this.setState({ isConnected: state.isConnected, showLoading: false });
    });
  }

  _onPressItem(video) {
    if (!this.state.isConnected) {
      return this.refs.toast.show(this.props.t('InternetConnection.PleaseCheckYourInternetConnection'), DURATION.SHORT);
    }

    this.props.navigation.navigate('ViewVideoScreen', { videoId: getVideoId(video.url) });
  }

  _renderItem(video) {
    let { width } = Dimensions.get('window');
    let fileName = video.fileName || 'register';

    return (
      <View style={[Style.card, { flexDirection: 'column', marginHorizontal: 16, marginTop: 8, marginBottom: 8}]}>
        <Thumbnail
          onPress={() => this._onPressItem(video)}
          imageWidth={'100%'}
          imageHeight={150}
          backgroundPlayIcon={Color.red}
          url={video.url} />

        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => this._onPressItem(video)}>
            <Text style={{ fontFamily: FontFamily.title, fontWeight: '700' }}>{video[`title_${i18n.language}`]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    if ( this.state.loading ) {
      return (
        <View style={styles.loadingWrapper}>
          <LoadingIndicator loading={this.state.loading} />
        </View>
      )
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        { this.state.isConnected &&
          <FlatList
            data={this.state.videos}
            renderItem={(item, i) => this._renderItem(item.item, i)}
            keyExtractor={item => item.code}
            contentContainerStyle={{paddingVertical: 8}}
          />
        }

        { !this.state.isConnected && this._renderNoInternetConnection() }

        <Toast ref='toast' position='top' positionValue={Platform.OS == 'ios' ? 120 : 140} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 12,
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  }
});

export default withTranslation()(Videos);
