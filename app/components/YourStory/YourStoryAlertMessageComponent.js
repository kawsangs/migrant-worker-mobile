import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AlertMessage from '../AlertMessage';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

const {useImperativeHandle} = React;

const YourStoryFormAlertMessageComponent = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    setAlertVisibility
  }))

  const setAlertVisibility = (status) => {
    setVisible(status)
  }

  const exitYourStory = () => {
    setVisible(false);
    dispatch(setCurrentPlayingAudio(null));
    navigation.goBack();
  }

  return <AlertMessage
            show={visible}
            warning={false}
            title={"ចាកចេញពីសាច់រឿង"}
            message={"តើអ្នកប្រាកដថាចង់ចាកចេញពីហ្គេមនេះដែរឬទេ?"}
            onPressAction={() => exitYourStory()}
            onPressCancel={() => setVisible(false)}
            audio={'exit_game.mp3'}
          />
})

export default YourStoryFormAlertMessageComponent;