import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import SurveyFormQuestionComponent from './SurveyFormQuestionComponent';
import SurveyFormButtonComponent from './SurveyFormButtonComponent';
import AlertMessage from '../AlertMessage';
import Quiz from '../../models/Quiz';
import Section from '../../models/Section';
import Question from '../../models/Question';

const SurveyFormContentComponent = (props) => {
  const navigation = useNavigation();
  const currentQuiz = useSelector(state => state.currentQuiz)
  // const currentIndex = useSelector(state => state.currentQuestionIndex)
  const [audioPlayer, setAudioPlayer] = useState(null)
  const [alertVisible, setAlertVisible] = useState(false);
  const [sections] = useState(Section.findByFormId(props.formId));
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const buttonRef = React.createRef();

  navigation.setOptions({
    headerLeft: () => (<HeaderBackButton tintColor={"#fff"} onPress={() =>handleBack()}/>)
  });

  const handleBack = () => {
    if (currentSection == 0)
      return setAlertVisible(true);

    navigation.goBack()
  }

  const renderFinish = () => {
    Quiz.setFinished(currentQuiz.uuid);
  }

  const existSurvey = () => {
    setAlertVisible(false);
    navigation.goBack();
  }

  const updateAnswers = (key, answer) => {
    let newAnswers = answers;
    if (!!answer)
      newAnswers[key] = answer;
    else
      delete newAnswers[key];

    setAnswers(newAnswers);
    buttonRef.current?.validateForm();
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
    if (currentSection < sections.length - 1)
      setCurrentSection(currentSection + 1);

    console.log('+++ Survey answer = ', answers)
  }

  const renderButton = () => {
    return <SurveyFormButtonComponent ref={buttonRef}
              answers={answers}
              currentSection={currentSection}
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