import React, {useEffect, useState} from 'react';
import {ScrollView, BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import SurveyFormQuestionComponent from './SurveyFormQuestionComponent';
import SurveyFormButtonComponent from './SurveyFormButtonComponent';
import SurveyFormAlertMessageComponent from './SurveyFormAlertMessageComponent';
import Section from '../../models/Section';
import Question from '../../models/Question';
import SurveyFormService from '../../services/survey_form_service';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

const SurveyFormContentComponent = (props) => {
  const navigation = useNavigation();
  const currentQuiz = useSelector(state => state.currentQuiz)
  const [sections] = useState(Section.findByFormId(props.formId));
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const buttonRef = React.useRef(null);
  const alertRef = React.useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let formattedAnswers = {};
    sections.map((section, index) => {
      formattedAnswers[index] = {};
    });
    setAnswers(formattedAnswers)

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      alertRef.current?.setAlertVisibility(true)
      return true;
    })
    return () => !!backHandler && backHandler.remove()
  }, [])

  navigation.setOptions({
    headerLeft: () => (<HeaderBackButton tintColor={"#fff"} onPress={() => alertRef.current?.setAlertVisibility(true)}/>)
  });

  const updateAnswers = (key, answer) => {
    let newAnswers = answers;
    if (!!answer)
      newAnswers[currentSection][key] = answer;
    else
      delete newAnswers[currentSection][key];

    setAnswers(newAnswers);
    buttonRef.current?.validateForm(currentSection);
  }

  const renderQuestionsOfSection = () => {
    return Question.findBySectionId(sections[currentSection].id).map((question, index) => {
      const key = `section_${currentSection}_q_${index}`;
      return <SurveyFormQuestionComponent
                key={key}
                question={question}
                updateAnswers={(answer) => updateAnswers(key, answer)}
             />
    })
  }

  const goNextOrFinish = () => {
    dispatch(setCurrentPlayingAudio(null));
    if (currentSection < sections.length - 1) {
      buttonRef.current?.validateForm(currentSection + 1);
      setCurrentSection(currentSection + 1);
    }
    else if (currentSection == sections.length - 1) {
      new SurveyFormService().submitSurvey(answers, currentQuiz.uuid);
      navigation.reset({ index: 1, routes: [{name: 'HomeScreen'}, { name: 'NotificationListScreen' }]});
    }
  }

  const renderButton = () => {
    return <SurveyFormButtonComponent ref={buttonRef}
              answers={answers}
              sections={sections}
              currentSection={currentSection}
              onPress={() => goNextOrFinish()}
           />
  }

  return (
    <React.Fragment>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingHorizontal: 16, paddingBottom: 26}}>
        { renderQuestionsOfSection() }
      </ScrollView>
      { renderButton() }
      <SurveyFormAlertMessageComponent ref={alertRef} />
    </React.Fragment>
  )
}

export default SurveyFormContentComponent;