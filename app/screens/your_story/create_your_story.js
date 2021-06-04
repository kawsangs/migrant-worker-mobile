import React, { Component } from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';

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
import OutlineInfoIcon from '../../components/OutlineInfoIcon';

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
  }

  renderEnd() {
    Quiz.setFinished(this.props.currentQuiz.uuid);

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <View style={[Style.card]}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <OutlineInfoIcon />
            <Text style={{fontFamily: FontFamily.title}}>បញ្ចប់សាច់រឿង</Text>
          </View>

          <Text>អបអរសារទរ អ្នកបានដឹងគន្លឹះសំខាន់ខ្លះៗ ដែលគាំទ្រអ្នកក្នុងការទទួលបានការងារដោយសុវត្ថិភាពនៅប្រទេសគោលដៅ</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{backgroundColor: Color.primary, padding: 8, borderRadius: 8, width: 90}}
          onPress={() => this._onPress()}>

          <Text style={{fontFamily: FontFamily.title, color: '#fff', textAlign: 'center'}}>រួចរាល់</Text>
        </TouchableOpacity>
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
