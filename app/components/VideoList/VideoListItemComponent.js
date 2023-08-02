import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Thumbnail from '../thumbnail';
import { FontFamily, Style } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { getVideoId } from '../../utils/youtube';

const VideoListItemComponent = (props) => {
  const { i18n } = useTranslation();
  const navigation = useNavigation();

  const onPressItem = (video) => {
    addStatistic('ViewVideo', { videoId: getVideoId(video.url), title: video[`title_${i18n.language}`] });
    navigation.navigate('ViewVideoScreen', { videoId: getVideoId(video.url), isLocalVideo: false });
  }

  return (
    <View style={[Style.card, { flexDirection: 'column', margin: 8, marginBottom: 8, padding: 0 }]}>
      <Thumbnail
        onPress={() => onPressItem(props.video)}
        imageWidth={'100%'}
        imageHeight={150}
        url={props.video.url}
      />

      <TouchableOpacity onPress={() => onPressItem(props.video)}>
        <Text style={{ fontFamily: FontFamily.title, padding: 10 }}>{props.video.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default VideoListItemComponent