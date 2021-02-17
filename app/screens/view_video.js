import React, { useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';
import LoadingIndicator from '../components/loading_indicator';
import { Toolbar } from 'react-native-material-ui';
import { FontFamily } from '../assets/stylesheets/base/font';

const ViewVideo = ({ route, navigation }) => {
  const { videoId } = route.params;
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const { width, height } = Dimensions.get('window');

  const renderToolBar = () => {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => navigation.goBack()}
        centerElement={'Videos'}
        rightElement={'home'}
        onRightElementPress={() => navigation.navigate('HomeScreen')}
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
            elevation: 0,
          },
        }}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {renderToolBar()}
      <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <YoutubePlayer
          height={200}
          width={width}
          ref={playerRef}
          play={playing}
          videoId={videoId}
          onReady={() => setLoading(false)}
        />

        {loading &&
          <View style={{ position: 'absolute' }}>
            <LoadingIndicator loading={true} />
          </View>
        }
      </View>
    </View>
  );
};

export default ViewVideo;
