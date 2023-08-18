import React, { Component } from 'react';
import { View, StatusBar, BackHandler } from 'react-native';

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

// Redux
import { connect } from 'react-redux';
import { setQuestions } from '../../actions/questionAction';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import AlertMessage from '../../components/AlertMessage';
import { setCurrentQuiz } from '../../actions/currentQuizAction';
import uuidv4 from '../../utils/uuidv4';
import { HeaderBackButton } from '@react-navigation/stack';
import HomeButton from '../../components/Toolbar/HomeButton';

class CreateYourStory extends Component {
  state = {loading: true};

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      headerLeft: () => (<HeaderBackButton tintColor={"#fff"} onPress={() => {
        this.setState({action: 'Back'});
        this._handleBack();
      }}/>),
      headerRight: () => (<HomeButton onPress={() => {
        this.setState({action: 'Home'});
        this._handleBack()
      }}/>),
    });
  }

  componentDidMount() {
    this._setForm(this.props.route.params.form_id);

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        this.setState({action: 'Back'});
        this._handleBack();
        return true;
      }
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _handleBack() {
    if (this.props.currentIndex > -1) {
      return this.setState({showAlert: true});
    }

    this._handleBackHome();
  }

  _handleBackHome() {
    if (this.state.action == 'Back') {
      return this.props.navigation.goBack();
    }

    this.props.navigation.popToTop();
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

  _closeAlertMessage() {
    this.setState({showAlert: false});
  }

  _handleHideMessage() {
    this._closeAlertMessage();
    this._handleBackHome();
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

        <AlertMessage
          show={this.state.showAlert}
          warning={false}
          title={"ចាកចេញពីសាច់រឿង"}
          message={"តើអ្នកប្រាកដថាចង់ចាកចេញពីហ្គេមនេះដែរឬទេ?"}
          onPressAction={() => this._handleHideMessage()}
          onPressCancel={() => this._closeAlertMessage()}
          audio={"exit_game.mp3"}
        />
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
