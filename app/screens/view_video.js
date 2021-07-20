import React, { useRef, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube';
import Video from 'react-native-video';

import { environment } from '../config/environment';

const ViewVideo = ({ route, navigation }) => {
  const { videoId, isLocalVideo } = route.params;
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      { isLocalVideo ?
        <Video
          source={videoId}
          style={styles.videoPlayer}
          controls={true}
          resizeMode='contain'
          fullscreenOrientation='landscape'
        />
        :
        <YouTube
          apiKey={environment.youtube_api_key}
          style={{ height: '50%', width: width }}
          ref={playerRef}
          play={playing}
          videoId={videoId}
          resumePlayAndroid={false}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  videoPlayer: {
    width: '100%',
    height: '50%',
    borderWidth: 1,
    alignSelf: 'center',
  },
});

export default ViewVideo;
