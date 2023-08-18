import React, { Component } from 'react';
import { View, ScrollView, TextInput } from 'react-native';

import { Color, Style } from '../../assets/stylesheets/base_style';
import uuidv4 from '../../utils/uuidv4';

import { withTranslation } from 'react-i18next';
import Question from '../../models/Question';
import Answer from '../../models/Answer';

import NextButton from '../../components/YourStory/NextButton';
import QuestionName from './questionName';

import { connect } from 'react-redux';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import { setCurrentPlayingAudio } from '../../actions/currentPlayingAudioAction';
import { addStatistic } from '../../utils/statistic';
import Audio from '../Register/Audio';

let _this = null;

class QuestionsText extends Component {
  constructor(props) {
    super(props)

    this.state = {
      answer: '',
      voice: '',
      uuid: uuidv4(),
      audioPlayer: null,
    };

    _this = this;
    this.audioRef = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!!this.props.currentPlayingAudio && !!this.state.audioPlayer) {
      this.audioRef.current?._stopPlaying();
      this.setState({audioPlayer: null});
    }
  }

  _renderInputField() {
    return (
      <TextInput
        value={this.state.answer}
        style={[{borderWidth: 1.5, paddingHorizontal: 10, marginTop: 10, borderRadius: 10}, !this.state.answer && !this.state.voice ? { borderColor: Color.red } : { borderColor: Color.gray }]}
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
    addStatistic(`${this.props.statisticPrefix}_${this.props.question.name}`, {answer: this.state.answer});
  }

  renderAudioRecorder() {
    return <Audio
              ref={this.audioRef}
              uuid={this.state.uuid}
              callback={(path) => this.setState({ voice: path })}
              audioPath={this.state.voice}
              audioPlayer={this.state.audioPlayer}
              updateAudioPlayer={(sound) => {
                _this.props.setCurrentPlayingAudio(null);
                _this.setState({ audioPlayer: sound });
              }}
            />
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[Style.container, Style.card]}>
            <QuestionName question={this.props.question } />
            { this._renderInputField() }
            { this.renderAudioRecorder() }
          </View>
        </ScrollView>

        <NextButton disabled={!this.state.answer && !this.state.voice} onPress={() => this._onPressNext() } />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    currentIndex: state.currentQuestionIndex,
    currentQuiz: state.currentQuiz,
    currentPlayingAudio: state.currentPlayingAudio,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentIndex: (index) => dispatch(setCurrentQuestionIndex(index)),
    setCurrentPlayingAudio: (uuid) => dispatch(setCurrentPlayingAudio(uuid))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(QuestionsText));
