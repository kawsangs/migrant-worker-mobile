import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions
} from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';
import { WebView } from 'react-native-webview';

const ViewVideo = ({route, navigation}) => {
  const { videoId } = route.params;
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <YoutubePlayer
        height={200}
        width={width}
        ref={playerRef}
        play={playing}
        videoId={videoId}
      />
    </View>
  );
};

export default ViewVideo;
