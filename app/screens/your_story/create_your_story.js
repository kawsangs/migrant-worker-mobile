import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { InjectArray } from '../../utils/math';
import uuidv4 from '../../utils/uuidv4';
import { autoImageHeight } from '../../utils/image_style';
import { addStatistic } from '../../utils/statistic';
import { Toolbar } from 'react-native-material-ui';



const win = Dimensions.get('window');

export default class CreateYourStory extends React.Component {
  state = {
    questions: [
      {
        id: 1,
        question: '1. What is your purpose there?',
        answers: [
          { id: 1, title: 'Answer A', answer: 'a', audioFileName: '' },
          { id: 2, title: 'Answer B', answer: 'b', audioFileName: '' },
          { id: 3, title: 'Answer C', answer: 'c', audioFileName: '' },
          { id: 4, title: 'Answer D', answer: 'd', audioFileName: '' },
          { id: 5, title: 'Answer E', answer: 'e', audioFileName: '' },
          { id: 6, title: 'Answer F', answer: 'f', audioFileName: '' },
        ]
      },
      {
        id: 2,
        question: '2. What is your purpose there?',
        answers: [
          { id: 1, title: 'Answer A', answer: 'a', audioFileName: '' },
          { id: 2, title: 'Answer B', answer: 'b', audioFileName: '' },
          { id: 3, title: 'Answer C', answer: 'c', audioFileName: '' },
          { id: 4, title: 'Answer D', answer: 'd', audioFileName: '' },
          { id: 5, title: 'Answer E', answer: 'e', audioFileName: '' },
          { id: 6, title: 'Answer F', answer: 'f', audioFileName: '' },
        ]
      },
      {
        id: 3,
        question: '3. What is your purpose there?',
        answers: [
          { id: 1, title: 'Answer A', answer: 'a', audioFileName: '' },
          { id: 2, title: 'Answer B', answer: 'b', audioFileName: '' },
          { id: 3, title: 'Answer C', answer: 'c', audioFileName: '' },
          { id: 4, title: 'Answer D', answer: 'd', audioFileName: '' },
          { id: 5, title: 'Answer E', answer: 'e', audioFileName: '' },
          { id: 6, title: 'Answer F', answer: 'f', audioFileName: '' },
        ]
      },
      {
        id: 4,
        question: '4. What is your purpose there?',
        answers: [
          { id: 1, title: 'Answer A', answer: 'a', audioFileName: '' },
          { id: 2, title: 'Answer B', answer: 'b', audioFileName: '' },
          { id: 3, title: 'Answer C', answer: 'c', audioFileName: '' },
          { id: 4, title: 'Answer D', answer: 'd', audioFileName: '' },
          { id: 5, title: 'Answer E', answer: 'e', audioFileName: '' },
          { id: 6, title: 'Answer F', answer: 'f', audioFileName: '' },
        ]
      },
      {
        id: 5,
        question: '5. What is your purpose there?',
        answers: [
          { id: 1, title: 'Answer A', answer: 'a', audioFileName: '' },
          { id: 2, title: 'Answer B', answer: 'b', audioFileName: '' },
          { id: 3, title: 'Answer C', answer: 'c', audioFileName: '' },
          { id: 4, title: 'Answer D', answer: 'd', audioFileName: '' },
          { id: 5, title: 'Answer E', answer: 'e', audioFileName: '' },
          { id: 6, title: 'Answer F', answer: 'f', audioFileName: '' },
        ]
      },
      {
        id: 6,
        question: '6. What is your purpose there?',
        answers: [
          { id: 1, title: 'Answer A', answer: 'a', audioFileName: '' },
          { id: 2, title: 'Answer B', answer: 'b', audioFileName: '' },
          { id: 3, title: 'Answer C', answer: 'c', audioFileName: '' },
          { id: 4, title: 'Answer D', answer: 'd', audioFileName: '' },
          { id: 5, title: 'Answer E', answer: 'e', audioFileName: '' },
          { id: 6, title: 'Answer F', answer: 'f', audioFileName: '' },
        ]
      },
    ],
    current_question: 0,

    answer: 'a',
    progress: 40,
  };

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={'Create your story'}
        rightElement={'home'}
        onRightElementPress={() => this._goTo('HomeScreen')}
        size={30}
        style={{
          titleText: {
            fontFamily: FontFamily.title,
            textAlign: 'center',
          },
          centerElementContainer: {
            marginLeft: 0
          },
          container: {
            width: '100%',
            backgroundColor: Color.pink,
            elevation: 0,
          },
        }}
      />
    );
  }

  _renderCard(item) {
    let isSelected = this.state.answer == item.answer;
    let selectedAnswer = isSelected ? { backgroundColor: Color.pink } : { backgroundColor: Color.gray };

    return (
      <TouchableOpacity
        key={uuidv4()}
        onPress={() => this.setState({ answer: item.answer })}
        style={[Style.card, styles.answerCard]}
        activeOpacity={0.8}
      >
        {!isSelected && <View style={styles.coverSoundIcon}>
          <PlaySound
            buttonAudioStyle={{ backgroundColor: isSelected ? Color.white : Color.pink }}
            iconStyle={{ tintColor: isSelected ? Color.pink : Color.white }}
            fileName={item.audioFileName || 'register'}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({ activePlaying: fileName })} />
        </View>}

        <View style={[styles.coverImage, selectedAnswer]}>
          {isSelected && <Image source={Images.checked} style={{ width: 55, height: 55 }} />}
        </View>

        <View style={styles.cardTitle}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderCards() {
    let list = [
      { id: 1, title: 'Answer A', answer: 'a', audioFileName: '' },
      { id: 2, title: 'Answer B', answer: 'b', audioFileName: '' },
      { id: 3, title: 'Answer C', answer: 'c', audioFileName: '' },
      { id: 4, title: 'Answer D', answer: 'd', audioFileName: '' },
      { id: 5, title: 'Answer E', answer: 'e', audioFileName: '' },
      { id: 6, title: 'Answer F', answer: 'f', audioFileName: '' },
    ];

    // let row = list.map((item) => this._renderCard(item));
    let question = this.state.questions[this.state.current_question];
    let row = question?.answers.map((item) => this._renderCard(item));

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.question} >
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700' }}>{question.question}</Text>
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

        <View style={styles.listAnswerContent}>
          {row}
        </View>
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={{ backgroundColor: Color.pink }}>
        <View style={styles.topHeaderContent}>
          <Text style={styles.topHeaderProgressLabel}>Progress 1/6</Text>
        </View>
        <View style={styles.topHeaderProgressBar}>
          <View style={{ width: `${this.state.progress}%`, backgroundColor: Color.white }} />
        </View>
      </View>
    )
  }

  _renderNextButton() {
    return (
      <View style={[Style.boxShadow, styles.nextButton]}>
        <TouchableOpacity
          onPress={() => this._goTo('CreateYourStoryTwoScreen')}
          style={styles.nextBtnAction}
          activeOpacity={0.8}
        >
          <View style={{ width: 58 }} />
          <View style={styles.coverNextText}>
            <Text style={styles.nextText}>Next</Text>
          </View>
          <PlaySound
            fileName={'register'}
            buttonAudioStyle={{ backgroundColor: Color.white }}
            iconStyle={{ tintColor: Color.pink }}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({ activePlaying: fileName })}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />
        {this._renderToolbar()}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          {this._renderHeader()}
          <View style={[Style.container, { flex: 1, marginBottom: 0 }]}>
            {this._renderCards()}
          </View>
        </ScrollView>
        {this._renderNextButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  answerCard: {
    width: '48%',
    minHeight: 200,
    marginBottom: 13,
    padding: 0
  },
  question: {
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  listAnswerContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topHeaderContent: {
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal: 16,
  },
  topHeaderProgressLabel: {
    color: Color.white,
    fontSize: 13,
    backgroundColor: '#902343',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  topHeaderProgressBar: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 0,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#b2355a',
    overflow: 'hidden',
  },
  coverSoundIcon: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
  coverImage: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  cardTitle: {
    paddingHorizontal: 14,
    paddingVertical: 14
  },
  title: {
    fontFamily: FontFamily.title,
    fontWeight: '700'
  },
  rowStyle: {
    flexDirection: 'row',
    flex: 1
  },
  nextButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Color.white,
  },
  nextBtnAction: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.pink,
    flexDirection: 'row'
  },
  coverNextText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: Color.white,
    fontFamily: FontFamily.title,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
