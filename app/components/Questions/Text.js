import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import uuidv4 from '../../utils/uuidv4';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

import Question from '../../models/Question';
import Answer from '../../models/Answer';
import Option from '../../models/Option';

import NextButton from '../../components/YourStory/NextButton';
import QuestionName from './questionName';

import { connect } from 'react-redux';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';

class QuestionsSelectOne extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: Option.byQuestion(props.question.id),
      answer: ''
    };
  }

  _renderInputField() {
    return (
      <TextInput
        value={this.state.answer}
        style={{borderWidth: 1, borderColor: Color.gray, marginTop: 10}}
        onChangeText={(value) => this.setState({answer: value})}
      />
    );
  }

  _onPressNext() {
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

            { this._renderInputField() }
          </View>
        </ScrollView>

        <NextButton
          disabled={!this.state.answer}
          onPress={() => this._onPressNext() } />
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
