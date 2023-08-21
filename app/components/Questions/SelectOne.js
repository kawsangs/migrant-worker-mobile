import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import { Style } from '../../assets/stylesheets/base_style';
import uuidv4 from '../../utils/uuidv4';

import { withTranslation } from 'react-i18next';

import Question from '../../models/Question';
import Answer from '../../models/Answer';
import Option from '../../models/Option';

import RadioButton from './radioButton';
import NextButton from '../../components/YourStory/NextButton';
import QuestionName from './questionName';
import AlertMessage from '../../components/AlertMessage';

import { connect } from 'react-redux';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import { addStatistic } from '../../utils/statistic';

class QuestionsSelectOne extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: Option.byQuestion(props.question.id),
      answer: '',
      selectedOption: {}
    };
  }

  _renderInputField() {
    return this.state.options.map((item, index) =>
      <View style={{borderBottomWidth: 1, borderColor: '#e6e7e9', paddingVertical: 6}} key={uuidv4()}>
        <RadioButton
          label={item.name}
          checked={item.id.toString() == this.state.answer}
          value={item.id.toString()}
          onSelect={id => {
            let option = this.state.options.filter(o => o.id.toString() == id)[0];
            this.setState({answer: id, selectedOption: option});
          }}
          avata={item.imageSource}
        />
      </View>
    );
  }

  _saveAnswer() {
    const { selectedOption } = this.state;
    const { question, currentQuiz } = this.props;
    let uuid = uuidv4();

    let data = {
      uuid: uuid,
      question_id: question.id,
      question_code: question.code,
      value: selectedOption.value,
      score: selectedOption.score || 0,
      user_uuid: currentQuiz.user_uuid,
      quiz_uuid: currentQuiz.uuid
    }

    Answer.upsert(data);
    addStatistic(`${this.props.statisticPrefix}_${this.props.question.name}`, {answer: selectedOption.value});
  }

  _onPressNext() {
    if (!!this.state.selectedOption.alert_message) {
      return this.setState({showAlert: true});
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
      answer: '',
      selectedOption: {}
    });
  }

  _handleHideMessage() {
    this.setState({showAlert: false});

    if (this.state.selectedOption.recursive) {
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
            showsVerticalScrollIndicator={false}
          >
            <View style={[Style.container, Style.card]}>
              <QuestionName question={this.props.question } />
              { this._renderInputField() }
            </View>
          </ScrollView>

          <NextButton disabled={!this.state.answer} onPress={() => this._onPressNext() } />
        </View>

        <AlertMessage
          show={this.state.showAlert}
          warning={this.state.selectedOption.warning}
          message={this.state.selectedOption.alert_message}
          onPressAction={() => this._handleHideMessage()}
          audio={this.state.selectedOption.alert_audio}
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
)(withTranslation()(QuestionsSelectOne));
