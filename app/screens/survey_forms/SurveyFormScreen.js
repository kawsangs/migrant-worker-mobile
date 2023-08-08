import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SurveyFormContentComponent from '../../components/SurveyForms/SurveyFormContentComponent';
import SurveyFormService from '../../services/survey_form_service';
import Question from '../../models/Question';
import Quiz from '../../models/Quiz';
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
    new SurveyFormService().findAndSave(props.route.params.form_id);
    setForm();
  }, [])

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

  return (
    <View style={{ flex: 1 }}>
      { !isLoading && <SurveyFormContentComponent currentQuestion={currentQuestion} /> }
    </View>
  )
}

export default SurveyFormScreen;