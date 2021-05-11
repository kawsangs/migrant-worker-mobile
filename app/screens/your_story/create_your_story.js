import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';
import { addStatistic } from '../../utils/statistic';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

import Question from '../../models/Question';
import Option from '../../models/Option';

import Toolbar from '../../components/SubCategory/Toolbar';
import OptionItem from '../../components/YourStory/OptionItem';
import ProgressHeader from '../../components/YourStory/ProgressHeader';
import NextButton from '../../components/YourStory/NextButton';

class CreateYourStory extends Component {
  constructor(props) {
    super(props)

    let questions = Question.byForm(props.route.params.form_id);
    let currentQuestion = questions[0];

    this.state = {
      questions: questions,
      currentQuestion: currentQuestion,
      options: Option.byQuestion(currentQuestion.id),
    };
  }

  _renderToolbar() {
    return(
      <Toolbar
        title={"Todo: chagne Story title "}
        navigation={this.props.navigation}
        elevation={0}
        backgroundColor={Color.pink} />
    )
  }

  _renderOptions() {
    return this.state.options.map((item, index) => <OptionItem item={item} key={index}/>);
  }

  _renderQuestion() {
    const { currentQuestion } = this.state;

    return (
      <View style={{flexDirection: 'row'}} >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FontFamily.title }}>{currentQuestion.name}</Text>
        </View>

        <PlaySound
          fileName={'register'}
          buttonAudioStyle={{ backgroundColor: Color.pink }}
          iconStyle={{ tintColor: Color.white }}
          activePlaying={this.state.activePlaying}
          onPress={(fileName) => this.setState({ activePlaying: fileName })}
          style={{ marginHorizontal: 10 }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />
        { this._renderToolbar() }

        <ProgressHeader />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>

          <View style={[Style.container, Style.card]}>
            { this._renderQuestion() }
            { this._renderOptions() }
          </View>
        </ScrollView>

        <NextButton />
      </View>
    );
  }
}

export default withTranslation()(CreateYourStory);
