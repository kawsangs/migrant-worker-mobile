import React from 'react';
import AudioPlayerButton from 'react-native-audio-player-button';
import {useDispatch, useSelector} from 'react-redux';
import { Color } from '../../assets/stylesheets/base_style';
import {setCurrentPlaying} from '../../actions/currentPlayingAudioAction';

const CustomAudioPlayerComponent = (props) => {
  const btnSize = 48;
  const rippleProps = props.rippled ? {
    buttonHeight: btnSize,
    buttonWidth: btnSize,
    rippleHeight: btnSize,
    rippleWidth: btnSize
  } : {};

  const dispatch = useDispatch();
  const currentPlayingAudio = useSelector(state => state.currentPlayingAudio);

  return <AudioPlayerButton
            {...props}
            {...rippleProps}
            isSpeakerIcon={true}
            iconSize={24}
            iconPrimaryColor={props.iconPrimaryColor || Color.primaryColor}
            iconSecondaryColor={Color.secondaryColor}
            allowPause={true}
            playingUuid={currentPlayingAudio}
            updatePlayingUuid={(uuid) => dispatch(setCurrentPlaying(uuid))}
         />
}

export default CustomAudioPlayerComponent;