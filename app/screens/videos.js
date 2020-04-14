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

export default class Videos extends React.Component {
  state = {
    videos: videos
  };

  _renderItem(video) {
    let { width } = Dimensions.get('window');
    let imageWidth = width/2 - 58;
    let fileName = video.fileName || 'register';

    return (
      <View style={[styles.cardWrapper, Style.boxShadow]}>
        <Thumbnail
          onPress={() => this.props.navigation.navigate('ViewVideoScreen', { videoId: getVideoId(video.url) })}
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
          contentContainerStyle={{paddingBottom: 16}}
          data={this.state.videos}
          renderItem={({ item }) => this._renderItem(item)}
          keyExtractor={item => item.code}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    margin: 16,
    marginBottom: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden'
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 12
  },
});
