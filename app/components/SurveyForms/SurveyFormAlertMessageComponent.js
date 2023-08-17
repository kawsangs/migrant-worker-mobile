import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import AlertMessage from '../AlertMessage';
import {setCurrentPlaying} from '../../actions/currentPlayingAudioAction';

const {useImperativeHandle} = React;

const SurveyFormAlertMessageComponent = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    setAlertVisibility
  }))

  const setAlertVisibility = (status) => {
    setVisible(status)
  }

  const exitSurvey = () => {
    setVisible(false);
    dispatch(setCurrentPlaying(null));
    navigation.reset({ index: 1, routes: [{name: 'HomeScreen'}, { name: 'NotificationListScreen' }]});
  }

  return <AlertMessage
            show={visible}
            warning={false}
            title={"ចាកចេញពីការស្ទង់មតិ"}
            message={"តើអ្នក​ពិតជា​ចង់​ចាកចេញ​ពី​ការស្ទង់​មតិ​នេះ​មែន​ទេ?"}
            onPressAction={() => exitSurvey()}
            onPressCancel={() => setVisible(false)}
            hideAudio={true}
          />
})

export default SurveyFormAlertMessageComponent;