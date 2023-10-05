import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import SurveyFormQuestionComponent from './SurveyFormQuestionComponent';
import SurveyFormButtonComponent from './SurveyFormButtonComponent';
import Section from '../../models/Section';
import Question from '../../models/Question';
import SurveyFormService from '../../services/survey_form_service';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

let visibleQuestions = [];

const SurveyFormContentComponent = (props) => {
  const navigation = useNavigation();
  const currentQuiz = useSelector(state => state.currentQuiz)
  const [sections] = useState(Section.findByFormId(props.formId));
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const buttonRef = React.useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let formattedAnswers = {};
    sections.map((section, index) => {
      formattedAnswers[index] = {};
    });
    setAnswers(formattedAnswers)
    
    return () => visibleQuestions = [];
  }, [])

  const updateAnswers = (key, answer) => {
    let newAnswers = {...answers};
    if (!!answer)
      newAnswers[currentSection][key] = answer;
    else
      delete newAnswers[currentSection][key];

    setAnswers(newAnswers);
    setTimeout(() => {
      buttonRef.current?.validateForm(currentSection, visibleQuestions);
    }, 200)
  }

  const handleSkipLogic = (key, index, isQuestionVisible, numOfQuestion, questionType) => {
    if (isQuestionVisible) {
      visibleQuestions[index] = true;
      // Enable the bottom button if it is the note question
      if (questionType == 'Note' && index == numOfQuestion - 1)
        setTimeout(() => {
          buttonRef.current?.updateValidStatus(true);
        }, 200);
    }
    else {
      // reset the answer of the question that is not visible
      visibleQuestions[index] = false;
      let newAnswers = {...answers};
      if (!!newAnswers[currentSection] && !!newAnswers[currentSection][key]) {
        delete newAnswers[currentSection][key];
        setAnswers(newAnswers)
      }
    }

    // Move to next section if the currenct section has no question matched with the criteria
    if (visibleQuestions.filter(q => q == true).length == 0 && index == numOfQuestion - 1) {
      visibleQuestions = [];
      if (currentSection < sections.length - 1 )
        setCurrentSection(currentSection + 1);
    }
  }

  const renderQuestionsOfSection = () => {
    const questions = Question.findBySectionId(sections[currentSection].id);
    return questions.map((question, index) => {
      const key = `section_${currentSection}_q_${index}`;
      const isQuestionVisible = new SurveyFormService().isQuestionMatchCriterias(question, answers, currentSection);
      handleSkipLogic(key, index, isQuestionVisible, questions.length, question.type.split('::')[1]);
      return <SurveyFormQuestionComponent
                key={key}
                currentSection={currentSection}
                questionIndex={index}
                question={question}
                answers={answers}
                currentAnswer={(!!answers[currentSection] && !!answers[currentSection][key]) ? answers[currentSection][key] : null}
                updateAnswers={(answer) => updateAnswers(key, answer)}
                beforeAnswer={(currentSection > 0 && !!answers[currentSection] && !!answers[currentSection][key]) ? answers[currentSection][key] : null}
                isVisible={isQuestionVisible}
            />
    })
  }

  const goNextOrFinish = () => {
    dispatch(setCurrentPlayingAudio(null));
    if (currentSection < sections.length - 1) {
      visibleQuestions = [];
      buttonRef.current?.updateValidStatus(false);
      setCurrentSection(currentSection + 1);
    }
    else if (currentSection == sections.length - 1) {
      new SurveyFormService().submitSurvey(answers, currentQuiz.uuid);
      navigation.reset({ index: 1, routes: [{name: 'BottomTab'}, { name: 'NotificationListScreen' }]});
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
    </React.Fragment>
  )
}

export default SurveyFormContentComponent;