import React, { Component } from 'react';
import { View, StatusBar, BackHandler } from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';

import { Color } from '../../assets/stylesheets/base_style';

import { withTranslation } from 'react-i18next';

// Model
import Question from '../../models/Question';
import Answer from '../../models/Answer';
import Quiz from '../../models/Quiz';
import Form from '../../models/Form';

// Component
import ProgressHeader from '../../components/YourStory/ProgressHeader';
import Questions from '../../components/Questions';
import YourStoryFinishComponent from '../../components/YourStory/YourStoryFinishComponent';
import YourStoryAlertMessageComponent from '../../components/YourStory/YourStoryAlertMessageComponent';

// Redux
import { connect } from 'react-redux';
import { setQuestions } from '../../actions/questionAction';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import { setCurrentQuiz } from '../../actions/currentQuizAction';
import uuidv4 from '../../utils/uuidv4';
import HomeButton from '../../components/Toolbar/HomeButton';


class CreateYourStory extends Component {
  state = {loading: true};

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      headerLeft: () => (<HeaderBackButton tintColor={"#fff"} onPress={() => {
        this.alertRef.current?.setAlertVisibility(true);
      }}/>),
      headerRight: () => (<HomeButton onPress={() => {
        this.setState({action: 'Home'});
        this._handleBack()
      }}/>),
    });

    this.alertRef = React.createRef(null);
  }

  componentDidMount() {
    this._setForm(this.props.route.params.form_id);

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        this.alertRef.current?.setAlertVisibility(true);
        return true;
      }
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _setForm(form_id) {
    this._setQuiz(form_id);
    this.props.setQuestions(Question.byForm(form_id));
    this.props.setCurrentIndex(0);
    this.setState({nextForm: Form.findNext(form_id), loading: false});
  }

  _setQuiz(form_id) {
    let uuid = uuidv4();
    Quiz.upsert({
      uuid: uuid,
      user_uuid: this.props.currentUser.uuid,
      form_id: form_id,
      quizzed_at: new Date()
    });

    let quiz = Quiz.find(uuid);
    this.props.setCurrentQuiz(quiz);
    this.setState({currentQuizUuid: uuid});
  }

  renderEnd() {
    Quiz.setFinished(this.state.currentQuizUuid);
    return <YourStoryFinishComponent
              nextForm={this.state.nextForm}
              setForm={() => this._setForm(this.state.nextForm.id)}
           />
  }

  render() {
    const { questions, currentIndex } = this.props;
    const currentQuestion = questions[currentIndex];

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />

        { currentIndex > -1 && <ProgressHeader /> }

        { !this.state.loading && !!currentQuestion && Questions(currentQuestion) }
        { !this.state.loading && !currentQuestion && this.renderEnd() }

        <YourStoryAlertMessageComponent ref={this.alertRef} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    currentIndex: state.currentQuestionIndex,
    currentQuiz: state.currentQuiz,
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setQuestions: (questions) => dispatch(setQuestions(questions)),
    setCurrentIndex: (index) => dispatch(setCurrentQuestionIndex(index)),
    setCurrentQuiz: (quiz) => dispatch(setCurrentQuiz(quiz)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(CreateYourStory));
