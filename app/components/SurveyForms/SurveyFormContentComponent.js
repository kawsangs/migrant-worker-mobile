import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import SurveyFormQuestionComponent from './SurveyFormQuestionComponent';
import SurveyFormButtonComponent from './SurveyFormButtonComponent';
import AlertMessage from '../AlertMessage';
import Section from '../../models/Section';
import Question from '../../models/Question';
import SurveyFormService from '../../services/survey_form_service';

const SurveyFormContentComponent = (props) => {
  const navigation = useNavigation();
  const currentQuiz = useSelector(state => state.currentQuiz)
  const [audioPlayer, setAudioPlayer] = useState(null)
  const [alertVisible, setAlertVisible] = useState(false);
  const [sections] = useState(Section.findByFormId(props.formId));
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const buttonRef = React.createRef();

  useEffect(() => {
    let formattedAnswers = {};
    sections.map((section, index) => {
      formattedAnswers[index] = {};
    });
    setAnswers(formattedAnswers)
  }, [])

  navigation.setOptions({
    headerLeft: () => (<HeaderBackButton tintColor={"#fff"} onPress={() =>handleBack()}/>)
  });

  const handleBack = () => {
    if (currentSection == 0)
      return setAlertVisible(true);

    navigation.goBack()
  }

  const existSurvey = () => {
    setAlertVisible(false);
    navigation.goBack();
  }

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
                audioPlayer={audioPlayer}
                updateAudioPlayer={setAudioPlayer}
                updateAnswers={(answer) => updateAnswers(key, answer)}
             />
    })
  }

  const goNextOrFinish = () => {
    if (currentSection < sections.length - 1) {
      buttonRef.current?.validateForm(currentSection + 1);
      setCurrentSection(currentSection + 1);
    }
    else if (currentSection == sections.length - 1) {
      new SurveyFormService().submitSurvey(answers, currentQuiz.uuid);
    }
  }

  const renderButton = () => {
    return <SurveyFormButtonComponent ref={buttonRef}
              answers={answers}
              sections={sections}
              audioPlayer={audioPlayer}
              updateAudioPlayer={setAudioPlayer}
              onPress={() => goNextOrFinish()}
           />
  }

  return (
    <React.Fragment>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingHorizontal: 16, paddingBottom: 26}}>
        { renderQuestionsOfSection() }
        { renderButton() }
      </ScrollView>
      <AlertMessage
        show={alertVisible}
        warning={false}
        title={"ចាកចេញពីការស្ទង់មតិ"}
        message={"តើអ្នក​ពិតជា​ចង់​ចាកចេញ​ពី​ការស្ទង់​មតិ​នេះ​មែន​ទេ?"}
        onPressAction={() => existSurvey()}
        onPressCancel={() => setAlertVisible(false)}
        audio={"exit_game.mp3"}
        hideAudio={true}
      />
    </React.Fragment>
  )
}

export default SurveyFormContentComponent;