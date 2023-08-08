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
import PlaySound from '../../components/play_sound';
import { addStatistic } from '../../utils/statistic';

class QuestionsResult extends Component {
  constructor(props) {
    super(props);

    const { question, currentQuiz } = props;
    let totalScore = Answer.byQuiz(currentQuiz.uuid).sum('score');

    this.state = {
      audio: totalScore >= question.passing_score ? question.passing_audio : question.failing_audio,
      message: totalScore >= question.passing_score ? question.passing_message : question.failing_message,
      audioPlayer: null,
    };
  }

  _onPressNext() {
    addStatistic(`YourStory_${this.props.question.name}`, {});

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

            <PlaySound
              filePath={this.state.audio}
              buttonAudioStyle={{ backgroundColor: Color.pink }}
              iconStyle={{ tintColor: Color.white }}
              audioPlayer={this.state.audioPlayer}
              updateMainAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
            />
          </View>
        </ScrollView>

        <NextButton
          onPress={() => this._onPressNext() }
          audioPlayer={this.state.audioPlayer}
          updateAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
          buttonColor={this.props.buttonColor}
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
