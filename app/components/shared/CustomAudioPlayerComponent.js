import React from 'react';
import {View} from 'react-native';
import AudioPlayerButton from 'react-native-audio-player-button';
import {useDispatch, useSelector} from 'react-redux';
import { Color } from '../../assets/stylesheets/base_style';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

const CustomAudioPlayerComponent = (props) => {
  const btnSize = 48;
  const rippleProps = props.rippled ? {
    rippleHeight: btnSize,
    rippleWidth: btnSize
  } : {};

  const dispatch = useDispatch();
  const currentPlayingAudio = useSelector(state => state.currentPlayingAudio);
  const buttonColor = !props.audio ? props.isOutline ? Color.gray : Color.lightGray : props.buttonBackgroundColor || Color.white;
  const outlineStyle = {
    backgroundColor: 'none',
    borderColor: buttonColor,
    borderWidth: 2,
  }

  return <View>
            <AudioPlayerButton
              {...props}
              // {...rippleProps}
              buttonHeight={btnSize}
              buttonWidth={btnSize}
              isSpeakerIcon={true}
              iconSize={24}
              iconPrimaryColor={props.iconPrimaryColor || Color.primaryColor}
              iconSecondaryColor={Color.secondaryColor}
              allowPause={true}
              playingUuid={currentPlayingAudio}
              updatePlayingUuid={(uuid) => dispatch(setCurrentPlayingAudio(uuid))}
              // buttonStyle={[{backgroundColor: !props.audio ? Color.lightGray : props.buttonBackgroundColor || Color.white}, props.buttonStyle]}
              buttonStyle={[props.isOutline ? outlineStyle : {backgroundColor: buttonColor}, props.buttonStyle]}
              iconStyle={[props.isOutline ? {color: buttonColor} : (!!props.iconColor && !!props.audio) && {color: props.iconColor}, props.iconStyle]}
              isFromAppBundle={true}
            />
         </View>
}

export default CustomAudioPlayerComponent;