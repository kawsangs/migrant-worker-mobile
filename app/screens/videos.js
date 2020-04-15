import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions
} from 'react-native';

import Thumbnail from '../components/thumbnail';
import videos from '../data/videos';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import { getVideoId } from '../utils/youtube';
import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';

export default class Videos extends React.Component {
  state = {
    videos: videos
  };

  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.setState({isConnected: state.isConnected});
    });

    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({isConnected: state.isConnected});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onPressItem(url) {
    if (!this.state.isConnected) {
      return this.refs.toast.show('សូមភ្ជាប់បណ្តាញអ៊ិនធឺណេតជាមុនសិន!', DURATION.SHORT);
    }

    this.props.navigation.navigate('ViewVideoScreen', { videoId: getVideoId(url) })
  }

  _renderItem(video) {
    let { width } = Dimensions.get('window');
    let imageWidth = width/2 - 58;
    let fileName = video.fileName || 'register';

    return (
      <View style={[Style.card, {flexDirection: 'row'}]}>
        <Thumbnail
          onPress={() => this._onPressItem(video.url)}
          imageWidth={imageWidth}
          imageHeight={150}
          url={video.url} />

        <View style={styles.textContainer}>
          <Text style={{fontFamily: FontFamily.title}}>{video.title}</Text>
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

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={this.state.videos}
          renderItem={({ item }) => this._renderItem(item)}
          keyExtractor={item => item.code}
        />
        <Toast ref='toast' position='top' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </SafeAreaView>
    );
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
});
