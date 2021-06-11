import React, { Component } from 'react';
import { View, StatusBar, Text, TouchableOpacity, BackHandler } from 'react-native';

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
import { HeaderBackButton } from '@react-navigation/stack';
import HomeButton from '../../components/Toolbar/HomeButton';

class CreateYourStory extends Component {
  state = {loading: true};

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      headerLeft: () => (<HeaderBackButton tintColor={"#fff"} onPress={() => {
        this.setState({action: 'Back'});
        this._handleBack();
      }}/>),
      headerRight: () => (<HomeButton onPress={() => {
        this.setState({action: 'Home'});
        this._handleBack()
      }}/>),
    });
  }

  componentDidMount() {
    this._setForm(this.props.route.params.form_id);

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        this.setState({action: 'Back'});
        this._handleBack();
        return true;
      }
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _handleBack() {
    if (this.props.currentIndex > -1) {
      return this.setState({showAlert: true});
    }

    this._handleBackHome();
  }

  _handleBackHome() {
    if (this.state.action == 'Back') {
      return this.props.navigation.goBack();
    }

    this.props.navigation.popToTop();
  }

  _setForm(form_id) {
    this._setQuiz(form_id);
    this.props.setQuestions(Question.byForm(form_id));
    this.props.setCurrentIndex(0);
    this.setState({nextForm: Form.findNext(form_id), loading: false});
  }

  _setQuiz(form_id) {
    let uuid = uuidv4();
    Quiz.upsert({
      uuid: uuid,
      user_uuid: this.props.currentUser.uuid,
      form_id: form_id,
      quizzed_at: new Date()
    });

    let quiz = Quiz.find(uuid);
    this.props.setCurrentQuiz(quiz);
    this.setState({currentQuizUuid: uuid});
  }

  renderEnd() {
    Quiz.setFinished(this.state.currentQuizUuid);

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <View style={[Style.card]}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <OutlineInfoIcon />
            <Text style={{fontFamily: FontFamily.title}}>អបអរសារទរ</Text>
          </View>

          <Text>អ្នកបានដឹងគន្លឹះសំខាន់ខ្លះៗ ដែលគាំទ្រអ្នកក្នុងការទទួលបានការងារដោយសុវត្ថិភាពនៅប្រទេសគោលដៅ</Text>
        </View>

        <View style={{position: 'absolute', bottom: 20, width: '100%'}}>
          { !!this.state.nextForm &&
            <TouchableOpacity
              activeOpacity={0.8}
              style={{backgroundColor: Color.primary, padding: 8, borderRadius: 8, flexDirection: 'row', width: '100%', justifyContent: 'center', marginBottom: 10}}
              onPress={() => this._setForm(this.state.nextForm.id)}>

              <View style={{flex: 1}}/>
              <Text style={{fontFamily: FontFamily.title, color: '#fff', textAlign: 'center'}}>ចូលទៅសាច់រឿង "{this.state.nextForm.name}"</Text>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Icon name={'arrow-forward'} style={{color: '#fff'}}/>
              </View>
            </TouchableOpacity>
          }

          <TouchableOpacity
            activeOpacity={0.8}
            style={{backgroundColor: Color.primary, padding: 8, borderRadius: 8, flexDirection: 'row', width: '100%', justifyContent: 'center'}}
            onPress={() => this.props.navigation.goBack()}>

            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Icon name={'arrow-back'} style={{color: '#fff'}}/>
            </View>
            <Text style={{fontFamily: FontFamily.title, color: '#fff', textAlign: 'center'}}>ត្រឡប់ទៅកាន់ "សាច់រឿងរបស់អ្នក"</Text>
            <View style={{flex: 1}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _handleHideMessage() {
    this.setState({showAlert: false});
    this._handleBackHome();
  }

  render() {
    const { questions, currentIndex } = this.props;
    const currentQuestion = questions[currentIndex];

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />

        { currentIndex > -1 && <ProgressHeader /> }

        { !this.state.loading && !!currentQuestion && Questions(currentQuestion) }
        { !this.state.loading && !currentQuestion && this.renderEnd() }

        <AlertMessage
          show={this.state.showAlert}
          warning={true}
          title={"ចាកចេញពីសាច់រឿង"}
          message={"តើអ្នកប្រាកដថាចង់ចាកចេញពីហ្គេមនេះដែរឬទេ?"}
          onPressAction={() => this._handleHideMessage()}
          onPressCancel={() => this.setState({showAlert: false})}
          audio={""}
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
