import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';

import SurveyFormContentComponent from '../../components/SurveyForms/SurveyFormContentComponent';

import SurveyFormService from '../../services/survey_form_service';
import Form from '../../models/Form';
import Question from '../../models/Question';
import Quiz from '../../models/Quiz';
import { Color } from '../../assets/stylesheets/base_style';
import uuidv4 from '../../utils/uuidv4';

import { setQuestions } from '../../actions/questionAction';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import { setCurrentQuiz } from '../../actions/currentQuizAction';

const SurveyFormScreen = (props) => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions)
  const currentIndex = useSelector(state => state.currentQuestionIndex)
  const currentUser = useSelector(state => state.currentUser)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    syncSurveyForm();
    setForm();
  }, [])

  const syncSurveyForm = () => {
    new SurveyFormService().get(props.route.params.form_id)
      .then(response => JSON.parse(response.data))
      .then(data => {
        Form.upsert({...data, type: 'survey'}, DeviceInfo.getVersion())
      })
      .catch(error => console.log('survey form error = ', error))
  }

  const setForm = () => {
    dispatch(setQuestions(Question.byForm(props.route.params.form_id)));
    dispatch(setCurrentQuestionIndex(0));

    let uuid = uuidv4();
    Quiz.upsert({
      uuid: uuid,
      user_uuid: currentUser.uuid,
      form_id: props.route.params.form_id,
      quizzed_at: new Date()
    });

    let quiz = Quiz.find(uuid);
    dispatch(setCurrentQuiz(quiz))
    setIsLoading(false);
  }

  const currentQuestion = questions[currentIndex];

  // console.log('=== questions  = ', currentQuestion)

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Survey form screen</Text> */}
      { !isLoading && <SurveyFormContentComponent currentQuestion={currentQuestion} /> }
    </View>
  )
}

export default SurveyFormScreen;