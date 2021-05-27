import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import { Button } from 'react-native-material-ui';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

// Model
import Question from '../../models/Question';
import Answer from '../../models/Answer';
import Quiz from '../../models/Quiz';

// Component
import ProgressHeader from '../../components/YourStory/ProgressHeader';
import Questions from '../../components/Questions';

// Redux
import { connect } from 'react-redux';
import { setQuestions } from '../../actions/questionAction';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import AlertMessage from '../../components/AlertMessage';

class CreateYourStory extends Component {
  constructor(props) {
    super(props)

    this.state = {};

    props.setQuestions(Question.byForm(props.route.params.form_id));
    props.setCurrentIndex(0);

    // Todo: need to remove, it is used for testing
    // Answer.deleteAll();
  }

  _onPress() {
    this.props.navigation.goBack();
    Quiz.uploadAsync(this.props.currentQuiz.uuid);
  }

  renderEnd() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <View style={[Style.card]}>
          <Text>Todo: End question message and click go to another step</Text>
        </View>

        <Button primary text="Go Home" onPress={() => this._onPress()} />
      </View>
    )
  }

  render() {
    const { questions, currentIndex } = this.props;
    const currentQuestion = questions[currentIndex];

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />

        { currentIndex > -1 && <ProgressHeader /> }

        { !!currentQuestion && Questions(currentQuestion) }
        { !currentQuestion && this.renderEnd() }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    currentIndex: state.currentQuestionIndex,
    currentQuiz: state.currentQuiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setQuestions: (questions) => dispatch(setQuestions(questions)),
    setCurrentIndex: (index) => dispatch(setCurrentQuestionIndex(index)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(CreateYourStory));
