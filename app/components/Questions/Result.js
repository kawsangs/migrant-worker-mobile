import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { Color, Style } from '../../assets/stylesheets/base_style';

import { withTranslation } from 'react-i18next';

import Question from '../../models/Question';
import Answer from '../../models/Answer';

import NextButton from '../../components/YourStory/NextButton';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';

import { connect } from 'react-redux';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import { addStatistic } from '../../utils/statistic';

class QuestionsResult extends Component {
  constructor(props) {
    super(props);

    const { question, currentQuiz } = props;
    let totalScore = Answer.byQuiz(currentQuiz.uuid).sum('score');

    this.state = {
      audio: totalScore >= question.passing_score ? question.passing_audio : question.failing_audio,
      message: totalScore >= question.passing_score ? question.passing_message : question.failing_message,
    };
  }

  _onPressNext() {
    addStatistic(`${this.props.statisticPrefix}_${this.props.question.name}`, {});

    let nextIndex = Question.findIndexNextQuestion(this.props.currentIndex, this.props.questions, this.props.currentQuiz.uuid);
    this.props.setCurrentIndex(nextIndex);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>

          <View style={[Style.container, Style.card, {flexDirection: 'row'}]}>
            <Text style={{flex: 1}}>{this.state.message}</Text>
            <CustomAudioPlayerComponent
              itemUuid={`question_result`}
              audio={this.state.audio}
              buttonBackgroundColor={Color.pink}
              isOutline={true}
            />
          </View>
        </ScrollView>

        <NextButton onPress={() => this._onPressNext() } buttonColor={this.props.buttonColor} />
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
)(withTranslation()(QuestionsResult));
