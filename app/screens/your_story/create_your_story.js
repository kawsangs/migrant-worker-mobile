import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';
import { addStatistic } from '../../utils/statistic';
import { Toolbar } from 'react-native-material-ui';
import Questionnaires from '../../data/json/questionnaires';

export default class CreateYourStory extends React.Component {

  constructor(props) {
    super(props)
    this._init();
  }

  _goTo(screenName, param) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName, param);
  }

  _renderToolbar() {
    let title = this.props.route.params?.title || '';
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={'Create your story ' + title}
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

  _init() {
    let get_questionnaires_data = Questionnaires.sort(function (a, b) {
      return a.order - b.order;
    });

    this.state = {
      current_question_index: 0,
      answer_id: 1,
      progress: 0,
      question_length: get_questionnaires_data.length,
      answers: [],
      questionnaires: get_questionnaires_data,
    };
  }

  _calculatePercentageProgressBar() {
    let question_length = this.state.questionnaires.length;
    let progress_percentage = Math.round(((this.state.current_question_index + 1) * 100) / question_length);

    return progress_percentage;
  }

  _renderCard(item) {
    let isSelected = this.state.answer_id == item.id;
    let selectedAnswer = isSelected ? { backgroundColor: Color.pink } : { backgroundColor: Color.gray };

    return (
      <TouchableOpacity
        key={uuidv4()}
        onPress={() => this.setState({ answer_id: item.id })}
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
          <Text style={styles.title}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _get_current_question() {
    let question = this.state.questionnaires[this.state.current_question_index];
    return question;
  }

  _renderCards() {
    let question = this._get_current_question();
    let row = question?.options.map((item) => this._renderCard(item));

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
    let progress_bar_width = this._calculatePercentageProgressBar();

    return (
      <View style={{ backgroundColor: Color.pink }}>
        <View style={styles.topHeaderContent}>
          <Text style={styles.topHeaderProgressLabel}>Progress {this.state.current_question_index + 1}/{this.state.question_length}</Text>
        </View>
        <View style={styles.topHeaderProgressBar}>
          <View style={{ width: `${progress_bar_width}%`, backgroundColor: Color.white }} />
        </View>
      </View>
    )
  }

  _checkSelectedAnswer() {
    let current_question = this._get_current_question();
    let answer_id = this.state.answer_id;
    let selected_answer = {};

    let selected_answer_weight = current_question.options.find(item => {
      return item.id == answer_id;
    })

    selected_answer = {
      code: current_question.code,
      weight: selected_answer_weight.weight
    }

    return selected_answer;
  }

  _checkNextQuestion() {
    let current_question_index = this.state.current_question_index;
    let all_questions = this.state.questionnaires;
    let answer = this._checkSelectedAnswer();

    let selected_answer = {
      code: answer.code,
      weight: answer.weight
    }

    this.setState({
      ...this.state,
      answers: [
        ...this.state.answers,
        selected_answer
      ]
    }, () => {
      let next_question_index = -1;

      for (let i = current_question_index + 1; i < all_questions.length; i++) {
        const question = all_questions[i];

        if (question.skip_logic !== null) {
          let operator = question.skip_logic.operator;

          if (operator == 'and') {
            let skip_flag = true;

            for (let j = 0; j < question.skip_logic.criterias.length; j++) {
              let criteria = question.skip_logic.criterias[j];

              var get_answer = this.state.answers.find(obj => {
                return obj.code == criteria.code;
              })

              if (!get_answer) {
                skip_flag = true;
                break;
              }

              if (criteria.operator == 'gt') {
                const greater = get_answer?.weight > criteria.value;
                skip_flag &= greater;
              } else if (criteria.operator == 'eq') {
                const equal = get_answer?.weight == criteria.value;
                skip_flag &= equal;
              }
            }

            if (!skip_flag) {
              next_question_index = i;
            }

          } else if (operator == 'or') {
            let skip_flag = false;

            for (let j = 0; j < question.skip_logic.criterias.length; j++) {
              let criteria = question.skip_logic.criterias[j];

              var get_answer = this.state.answers.find(obj => {
                return obj.code == criteria.code;
              })

              if (!get_answer) {
                skip_flag = true;
                break;
              }

              if (criteria.operator == 'gt') {
                const greater = get_answer?.weight > criteria.value;
                skip_flag |= greater;

              } else if (criteria.operator == 'eq') {
                const equal = get_answer?.weight == criteria.value;
                skip_flag |= equal;
              }
            }

            if (!skip_flag) {
              next_question_index = i;
            }
          }

        } else {
          next_question_index = i;
        }

        if (next_question_index >= 0) {
          break;
        }
      }

      if (next_question_index >= 0) {
        this.setState({
          ...this.state,
          answer_id: 1,
          current_question_index: next_question_index
        })
      } else {
        let answers = this.state.answers;

        var total_weight = answers.reduce(function (prev, cur) {
          return prev + cur.weight;
        }, 0);

        this._goTo('TestResultScreen', { total_weight: total_weight });
      }
    })
  }

  _renderNextButton() {
    return (
      <View style={[Style.boxShadow, styles.nextButton]}>
        <TouchableOpacity
          onPress={() => this._checkNextQuestion()}
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
