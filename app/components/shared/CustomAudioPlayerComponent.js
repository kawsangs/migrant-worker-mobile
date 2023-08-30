import React from 'react';
import {View} from 'react-native';
import AudioPlayerButton from 'react-native-audio-player-button';
import {useDispatch, useSelector} from 'react-redux';
import { Color } from '../../assets/stylesheets/base_style';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';
import { addStatistic } from '../../utils/statistic';

const CustomAudioPlayerComponent = (props) => {
  const btnSize = 48;
  const dispatch = useDispatch();
  const currentPlayingAudio = useSelector(state => state.currentPlayingAudio);
  const buttonColor = !props.audio ? props.isOutline ? Color.gray : Color.lightGray : props.buttonBackgroundColor || Color.white;
  const outlineStyle = {
    backgroundColor: 'none',
    borderColor: buttonColor,
    borderWidth: 2,
  }
  const btnRef = React.useRef(null);

  return <View>
            <AudioPlayerButton
              {...props}
              ref={btnRef}
              buttonHeight={btnSize}
              buttonWidth={btnSize}
              rippleHeight={btnSize}
              rippleWidth={btnSize}
              rippled={true}
              isSpeakerIcon={true}
              iconSize={24}
              iconPrimaryColor={props.iconPrimaryColor || Color.primaryColor}
              iconSecondaryColor={Color.secondaryColor}
              allowPause={true}
              playingUuid={currentPlayingAudio}
              updatePlayingUuid={(uuid) => dispatch(setCurrentPlayingAudio(uuid))}
              buttonStyle={[props.isOutline ? outlineStyle : {backgroundColor: buttonColor}, props.buttonStyle]}
              iconStyle={[props.isOutline ? {color: buttonColor} : (!!props.iconColor && !!props.audio) && {color: props.iconColor}, props.iconStyle]}
              isFromAppBundle={true}
              onPress={() => !!btnRef.current?.getPlayingStatus() && addStatistic('PlayAudio')}
            />
         </View>
}

export default CustomAudioPlayerComponent;