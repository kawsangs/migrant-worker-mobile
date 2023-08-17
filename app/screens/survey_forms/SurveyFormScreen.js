import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SurveyFormContentComponent from '../../components/SurveyForms/SurveyFormContentComponent';
import SurveyFormService from '../../services/survey_form_service';
import Notification from '../../models/Notification';
import Form from '../../models/Form';
import Quiz from '../../models/Quiz';
import uuidv4 from '../../utils/uuidv4';
import { Color } from '../../assets/stylesheets/base_style';
import { setCurrentQuiz } from '../../actions/currentQuizAction';
import { setNotifications } from '../../actions/notificationAction';

const SurveyFormScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Notification.update(route.params.uuid, { is_read: true });
    dispatch(setNotifications(Notification.all()));

    if (!Form.findById(route.params.form_id))
      new SurveyFormService().findAndSave(route.params.form_id, () => setForm());
    else
      setForm()
  }, [])

  const setForm = () => {
    let uuid = uuidv4();
    Quiz.upsert({
      uuid: uuid,
      user_uuid: currentUser.uuid,
      form_id: route.params.form_id,
      quizzed_at: new Date()
    });

    let quiz = Quiz.find(uuid);
    dispatch(setCurrentQuiz(quiz))
    setIsLoading(false);
  }

  return (
    <View style={{ flex: 1 }}>
      { !isLoading ? <SurveyFormContentComponent formId={route.params.form_id} />
        : <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.primary} /></View>
      }
    </View>
  )
}

export default SurveyFormScreen;