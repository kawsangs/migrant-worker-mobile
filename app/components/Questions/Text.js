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

import NextButton from '../../components/YourStory/NextButton';
import QuestionName from './questionName';

import { connect } from 'react-redux';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';

import Audio from '../Register/Audio';

class QuestionsText extends Component {
  constructor(props) {
    super(props)

    this.state = {
      answer: '',
      voice: '',
      uuid: uuidv4(),
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
    this._saveAnswer();
    let nextIndex = Question.findIndexNextQuestion(this.props.currentIndex, this.props.questions, this.props.currentQuiz.uuid);
    this.props.setCurrentIndex(nextIndex);
  }

  _saveAnswer() {
    const { question, currentQuiz } = this.props;

    let data = {
      uuid: this.state.uuid,
      question_id: question.id,
      question_code: question.code,
      value: this.state.answer,
      user_uuid: currentQuiz.user_uuid,
      quiz_uuid: currentQuiz.uuid,
      voice: this.state.voice,
    }

    Answer.upsert(data);
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

            <Audio
              uuid={this.state.uuid}
              callback={(path) => this.setState({ voice: path })}
              audioPath={this.state.voice} />
          </View>
        </ScrollView>

        <NextButton
          disabled={!this.state.answer && !this.state.voice}
          onPress={() => this._onPressNext() } />
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
    setCurrentIndex: (index) => dispatch(setCurrentQuestionIndex(index))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(QuestionsText));
