import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import { Button } from 'react-native-material-ui';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

// Model
import Question from '../../models/Question';
import Answer from '../../models/Answer';

// Component
import Toolbar from '../../components/SubCategory/Toolbar';
import ProgressHeader from '../../components/YourStory/ProgressHeader';
import Questions from '../../components/Questions';

// Redux
import { connect } from 'react-redux';
import { setQuestions } from '../../actions/questionAction';
import { setCurrentQuestionIndex } from '../../actions/currentQuestionIndexAction';
import AlertMessage from '../../components/AlertMessage';

class CreateYourStory extends Component {
  constructor(props) {
    super(props)

    this.state = {};

    props.setQuestions(Question.byForm(props.route.params.form_id));
    props.setCurrentIndex(0);

    // Todo: need to remove, it is used for testing
    Answer.deleteAll();
  }

  renderEnd() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <View style={[Style.card]}>
          <Text>Todo: End question message and click go to another step</Text>
        </View>

        <Button primary text="Go Home" onPress={() => this.props.navigation.goBack()} />
      </View>
    )
  }

  render() {
    const { questions, currentIndex } = this.props;
    const currentQuestion = questions[currentIndex];

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />

        <Toolbar
          title={"Todo: change Story title "}
          navigation={this.props.navigation}
          elevation={0}
          backgroundColor={Color.pink} />

        <ProgressHeader />

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
