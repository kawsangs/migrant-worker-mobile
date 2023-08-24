import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import audioPlayerService from '../../services/audio_player_service';
import { FAST_FORWARD, REVERSE } from '../../constants/audio_constant';
import styles from '../../styles/categoryAudioPlayerComponentStyle';
import { Color } from '../../assets/stylesheets/base_style';

const LeafCategoryAudioControlButtonsComponent = (props) => {
  const disabledColor = () => {
    if (!props.audio)
      return { color: Color.lightGray };

    return {};
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, width: 200, alignSelf: 'center'}}>
      <TouchableOpacity onPress={() => audioPlayerService.fastForwardOrReverse(props.audioPlayer, REVERSE)} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
        <Icon name='backward' size={20} style={[styles.iconStyle, disabledColor()]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.playAudio()} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
        <Icon name={!!props.countInterval ? 'pause' : 'play'} size={props.iconSize}
          style={[styles.iconStyle, props.iconStyle, disabledColor()]}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => audioPlayerService.fastForwardOrReverse(props.audioPlayer, FAST_FORWARD)} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
        <Icon name='forward' size={20} style={[styles.iconStyle, disabledColor()]} />
      </TouchableOpacity>
    </View>
  );
}

export default LeafCategoryAudioControlButtonsComponent;