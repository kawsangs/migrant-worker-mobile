import React, { Component } from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import { Button, Icon } from 'react-native-material-ui';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

// Model
import Question from '../../models/Question';
import Answer from '../../models/Answer';
import Quiz from '../../models/Quiz';
import Form from '../../models/Form';

// Component
import ProgressHeader from '../../components/YourStory/ProgressHeader';
import Questions from '../../components/Questions';

// Redux
import { connect } from 'react-redux';
import { setQuestions } from '../../actions/questionAction';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import AlertMessage from '../../components/AlertMessage';
import OutlineInfoIcon from '../../components/OutlineInfoIcon';
import { setCurrentQuiz } from '../../actions/currentQuizAction';
import uuidv4 from '../../utils/uuidv4';

class CreateYourStory extends Component {
  componentDidMount() {
    this._setForm(this.props.route.params.form_id);
  }

  _setForm(form_id) {
    this._setQuiz(form_id);
    this.props.setQuestions(Question.byForm(form_id));
    this.props.setCurrentIndex(0);
    this.setState({nextForm: Form.findNext(form_id)});
  }

  _setQuiz(form_id) {
    let uuid = uuidv4();
    Quiz.upsert({
      uuid: uuid,
      user_uuid: this.props.currentUser.uuid,
      form_id: form_id,
      quizzed_at: (new Date).toDateString()
    });

    let quiz = Quiz.find(uuid);
    this.props.setCurrentQuiz(quiz);
  }

  renderEnd() {
    Quiz.setFinished(this.props.currentQuiz.uuid);

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <View style={[Style.card]}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <OutlineInfoIcon />
            <Text style={{fontFamily: FontFamily.title}}>អបអរសារទរ</Text>
          </View>

          <Text>អ្នកបានដឹងគន្លឹះសំខាន់ខ្លះៗ ដែលគាំទ្រអ្នកក្នុងការទទួលបានការងារដោយសុវត្ថិភាពនៅប្រទេសគោលដៅ</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{backgroundColor: Color.primary, padding: 8, borderRadius: 8, flexDirection: 'row'}}
            onPress={() => this.props.navigation.goBack()}>

            <Icon name={'arrow-back'} style={{color: '#fff'}}/>
            <Text style={{fontFamily: FontFamily.title, color: '#fff', textAlign: 'center'}}>ត្រឡប់ក្រោយ</Text>
          </TouchableOpacity>

          { !!this.state.nextForm &&
            <View style={{flex: 1}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{backgroundColor: Color.primary, padding: 8, borderRadius: 8, flexDirection: 'row'}}
                onPress={() => this._setForm(this.state.nextForm.id)}>

                <Text style={{fontFamily: FontFamily.title, color: '#fff', textAlign: 'center'}}>ចូលទៅសាច់រឿងបន្ទាប់</Text>
                <Icon name={'arrow-forward'} style={{color: '#fff'}}/>
              </TouchableOpacity>
            </View>
          }
        </View>
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
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setQuestions: (questions) => dispatch(setQuestions(questions)),
    setCurrentIndex: (index) => dispatch(setCurrentQuestionIndex(index)),
    setCurrentQuiz: (quiz) => dispatch(setCurrentQuiz(quiz)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(CreateYourStory));
