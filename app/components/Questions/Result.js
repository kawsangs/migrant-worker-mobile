import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import uuidv4 from '../../utils/uuidv4';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

import Question from '../../models/Question';
import Answer from '../../models/Answer';

import NextButton from '../../components/YourStory/NextButton';
import QuestionName from './questionName';

import { connect } from 'react-redux';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';

class QuestionsSelectOne extends Component {
  _renderMessage() {
    const { question } = this.props;
    const totalScore = Answer.byQuiz('123').sum('score');
    const message = totalScore >= question.passing_score ? question.passing_message : question.failing_message;

    return (<Text>{message}</Text>);
  }

  _onPressNext() {
    if ( this.props.currentIndex == this.props.questions.length - 1) {
      // Todo: enhance message
      return alert("end questions");
    }

    // Todo: update quizUuid
    let quizUuid = "123";

    let nextIndex = Question.findIndexNextQuestion(this.props.currentIndex, this.props.questions, quizUuid);
    this.props.setCurrentIndex(nextIndex);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>

          <View style={[Style.container, Style.card]}>
            <QuestionName question={this.props.question } />

            { this._renderMessage() }
          </View>
        </ScrollView>

        <NextButton onPress={() => this._onPressNext() } />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    currentIndex: state.currentQuestionIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentIndex: (index) => dispatch(setCurrentQuestionIndex(index))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(QuestionsSelectOne));
