import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Video from 'react-native-video';

import {isSmallScreenDevice} from '../utils/responsive_util';

const ViewVideo = ({ route, navigation }) => {
  const { videoId, isLocalVideo } = route.params;
  const [isLandscapeView, setIsLandScapeView] = useState(false);

  Dimensions.addEventListener('change', () => {
    if (Dimensions.get('window').width > Dimensions.get('window').height)
      setIsLandScapeView(true);
    else
      setIsLandScapeView(false);
  });

  return (
    <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      { isLocalVideo ?
        <Video
          source={videoId}
          style={styles.videoPlayer}
          controls={true}
          resizeMode='contain'
          fullscreenOrientation='all'
          fullscreenAutorotate={true}
          fullscreen={isLandscapeView}
        />
        :
        <YoutubePlayer
          height={isSmallScreenDevice() ? 220 : 300}
          width='100%'
          play={true}
          videoId={videoId}
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