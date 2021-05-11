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

import OptionItem from '../../components/YourStory/OptionItem';
import NextButton from '../../components/YourStory/NextButton';
import QuestionName from './questionName';

import { connect } from 'react-redux';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';

class QuestionsMultiple extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: Option.byQuestion(props.question.id),
      answer: ''
    };
  }

  _renderInputField() {
    return this.state.options.map((item, index) =>
      <OptionItem
        item={item}
        key={index}
        answer={ this.state.answer }
        onSelect={ (value) => this.setState({answer: value}) }
      />
    );
  }

  _saveAnswer() {
    const { options, answer } = this.state;

    let data = {
      uuid: uuidv4(),
      question_id: this.props.question.id,
      question_code: this.props.question.code,
      value: answer,
      score: options.filter(o => o.value == answer)[0].score || 0,
      // Todo: update user_uuid and quiz_uuid
      user_uuid: "123",
      quiz_uuid: "123"
    }

    Answer.upsert(data);
  }

  _onPressNext() {
    // Todo: update quizUuid
    let quizUuid = "123";

    this._saveAnswer();

    if ( this.props.currentIndex == this.props.questions.length - 1) {
      // Todo: enhance message
      return alert("end questions");
    }

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
          disabled={false && !this.state.answer}
          onPress={() => this._onPressNext() }
        />
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
)(withTranslation()(QuestionsMultiple));
