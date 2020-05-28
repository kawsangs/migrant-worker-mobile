import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import Thumbnail from '../components/thumbnail';
import videoList from '../data/json/videos';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import { getVideoId } from '../utils/youtube';
import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';
import { Icon, Toolbar } from 'react-native-material-ui';
import LoadingIndicator from '../components/loading_indicator';
import { addStatistic } from '../utils/statistic';
import CollapsibleNavbar from '../components/collapsible_navbar';

export default class Videos extends React.Component {
  state = {
    videos: videoList,
    loading: true
  };

  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.setState({isConnected: state.isConnected, loading: false});
    });

    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({isConnected: state.isConnected});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _renderNoInternetConnection() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name='info-outline' color='#111' size={24} style={{marginRight: 8}} iconSet='MaterialIcons'/>
          <Text>មិនមានការតភ្ជាប់បណ្តាញទេឥឡូវនេះ។</Text>
        </View>
        <Text>សូមព្យាយាម​ម្តង​ទៀត​</Text>

        { this.state.showLoading && <ActivityIndicator size="small" /> }

        <View style={{marginTop: 20}}>
          <Button title='ព្យាយាមម្តងទៀត' onPress={() => this._retryConnection()}/>
        </View>
      </View>
    )
  }

  _retryConnection() {
    this.setState({showLoading: true})

    NetInfo.fetch().then(state => {
      this.setState({isConnected: state.isConnected, showLoading: false});
    });
  }

  _onPressItem(video) {
    if (!this.state.isConnected) {
      return this.refs.toast.show('សូមភ្ជាប់បណ្តាញអ៊ិនធឺណេតជាមុនសិន!', DURATION.SHORT);
    }

    addStatistic('ViewVideo', { videoId: getVideoId(video.url), title: video.title });
    this.props.navigation.navigate('ViewVideoScreen', { videoId: getVideoId(video.url) });
  }

  _renderItem(video) {
    let { width } = Dimensions.get('window');
    let imageWidth = width/2 - 58;
    let fileName = video.fileName || 'register';

    return (
      <View style={[Style.card, {flexDirection: 'row'}]}>
        <Thumbnail
          onPress={() => this._onPressItem(video)}
          imageWidth={imageWidth}
          imageHeight={150}
          url={video.url} />

        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => this._onPressItem(video)}>
            <Text style={{fontFamily: FontFamily.title}}>{video.title}</Text>
          </TouchableOpacity>

          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <PlaySound
              fileName={fileName}
              activePlaying={this.state.activePlaying}
              onPress={(fileName) => this.setState({activePlaying: fileName})}/>
          </View>
        </View>
      </View>
    )
  }

  _onChangeText(val) {
    if (!val) {
      this._onRefresh();
    }

    if (val.length > 1) {
      let list = videoList.filter((video) => {
        return video.title.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
      this.setState({videos: list});
    }
  }

  _onRefresh() {
    this.setState({videos: videoList});
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={ 'arrow-back' }
        centerElement={'វីដេអូ និងករណីចំណាកស្រុក'}
        searchable={{
          autoFocus: true,
          placeholder: 'ស្វែងរក',
          onChangeText: this._onChangeText.bind(this),
          onSearchClosed: this._onRefresh.bind(this)
        }}
        onLeftElementPress={() => this.props.navigation.goBack()}
        style={{titleText: {fontFamily: FontFamily.title}, container: {width: '100%'}}}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CollapsibleNavbar
          options={{
            header: this._renderToolbar(),
            bodyContentType: 'FlatList',
            bodyContentProps: {
              contentContainerStyle: styles.flatList,
              data: this.state.videos,
              renderItem: ({ item }) => this._renderItem(item),
              keyExtractor: item => item.code
            },
            noResultContent: !this.state.loading && !this.state.isConnected && this._renderNoInternetConnection()
          }}
        />

        { this.state.loading &&
          <View style={styles.loadingWrapper}>
            <LoadingIndicator loading={true}/>
          </View>
        }

        <Toast ref='toast' position='top' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 12
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
