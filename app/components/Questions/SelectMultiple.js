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
import Option from '../../models/Option';

import { Checkbox } from 'react-native-material-ui'
import NextButton from '../../components/YourStory/NextButton';
import QuestionName from './questionName';
import AlertMessage from '../../components/AlertMessage';

import { connect } from 'react-redux';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';

class QuestionsMultiple extends Component {
  answerOptions = [];
  alertOptions = [];
  alertOptionIndex = 0;

  constructor(props) {
    super(props)

    this.state = {
      options: Option.byQuestion(props.question.id),
      answers: [],
      alertOption: {},
    };
  }

  _onCheckOption(value) {
    let answers = this.state.answers;
    let index = answers.indexOf(value);

    if (index > -1) {
      answers.splice(index, 1);
    } else {
      answers.push(value);
    }

    this.setState({answers: answers});
  }

  _renderInputField() {
    const { answers } = this.state;
    let self = this;

    return this.state.options.map((item, index) => {
      let value = item.id.toString();

      return (
        <Checkbox
          key={index}
          label={item.name}
          value={value}
          checked={answers.includes(value)}
          onCheck={(checked, value) => self._onCheckOption(value)} />
      );
    })
  }

  _saveAnswer() {
    let scores = this.answerOptions.map((o) => parseInt(o.score) || 0);
    scores = scores.reduce((a, b) => a + b);

    let data = {
      uuid: uuidv4(),
      question_id: this.props.question.id,
      question_code: this.props.question.code,
      value: this.answerOptions.map(o => o.value).join(','),
      score: scores,
      user_uuid: this.props.currentQuiz.user_uuid,
      quiz_uuid: this.props.currentQuiz.uuid
    }

    Answer.upsert(data);
  }

  _onPressNext() {
    this.answerOptions = this.state.options.filter(o => this.state.answers.includes(o.id.toString()));
    this.alertOptions = this.answerOptions.filter(o => !!o.alert_message);

    if (!!this.alertOptions.length) {
      return this.setState({showAlert: true, alertOption: this.alertOptions[0]});
    }

    this._handleNext();
  }

  _handleNext() {
    this._saveAnswer();

    let nextIndex = Question.findIndexNextQuestion(this.props.currentIndex, this.props.questions, this.props.currentQuiz.uuid);
    this.props.setCurrentIndex(nextIndex);
  }

  _resetCurrentQuestion() {
    this.setState({
      answers: [],
      alertOption: {},
    });

    this.answerOptions = [];
  }

  _handleHideMessage() {
    this.setState({showAlert: false});
    this.alertOptionIndex++;

    if (!!this.alertOptions[this.alertOptionIndex]) {
      return this.setState({alertOption: this.alertOptions[this.alertOptionIndex], showAlert: true});
    }

    // not sure about should I save the answer or not in case (recursive)
    if (this.state.alertOption.recursive) {
      this._resetCurrentQuestion();
    } else {
      this._handleNext();
    }
  }

  render() {
    return (
      <>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>

            <View style={[Style.container, Style.card]}>
              <QuestionName question={this.props.question } />

              { this._renderInputField() }
            </View>
          </ScrollView>

          <NextButton
            disabled={!this.state.answers.length}
            onPress={() => this._onPressNext() }
          />
        </View>

        <AlertMessage
          show={this.state.showAlert}
          warning={this.state.alertOption.warning}
          message={this.state.alertOption.alert_message}
          onPressAction={() => this._handleHideMessage()}
          audio={this.state.alertOption.alert_audio}
        />

      </>
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
    setCurrentIndex: (index) => dispatch(setCurrentQuestionIndex(index))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(QuestionsMultiple));
