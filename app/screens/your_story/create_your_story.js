import React, { Component } from 'react';
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
import realm from '../../schemas/schema';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';


class CreateYourStory extends Component {

  constructor(props) {
    super(props)
    this._init();
  }

  _goTo(screenName, param) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName, param);
  }

  _renderToolbar() {
    let params = this.props.route.params || '';
    let title = params && params.title[`title_${i18n.language}`];

    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={this.props.t('CreateYourStoryScreen.HeaderTitle') + " " + title}
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
    let get_questionnaires_data = Questionnaires.sort(function (a, b) { return a.order - b.order; });
    let get_question_from_realm = realm.objects('Question');
    let list_question = null;

    console.log("get_question_from_realm : ", get_question_from_realm);

    // if (get_question_from_realm.length > 0) {
    //   // console.log("get_question_from_realm.length : ", get_question_from_realm.length);

    //   list_question = get_question_from_realm;

    // } else {
    //   // console.log("get_question_from_realm : ", get_question_from_realm);

    //   try {
    //     get_questionnaires_data.map(item => {
    //       realm.write(() => {
    //         realm.create('Question', item, true);
    //       });
    //     })
    //   } catch (e) {
    //     alert(e);
    //   }

    //   list_question = get_questionnaires_data;
    // }

    this.state = {
      current_question_index: 0,
      answer: [],
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

  _onSelectAnswer(item) {
    let isSelected = this.state.answer.find(i => {
      return i.id == item.id;
    })

    if (isSelected) {
      let filter_array = this.state.answer.filter(item => {
        return item.id !== isSelected.id;
      });

      this.setState({
        answer: filter_array
      })

    } else {
      let answer = [...this.state.answer];

      answer.push({
        id: item.id,
        weight: item.weight
      });

      this.setState({ answer });

    }

  }

  _renderCard(item) {

    let isSelected = this.state.answer.find(i => i.id == item.id)
    let selectedAnswer = isSelected ? { backgroundColor: Color.pink } : { backgroundColor: Color.gray };

    return (
      <TouchableOpacity
        key={uuidv4()}
        // onPress={() => this.setState({ answer_id: item.id })}
        onPress={() => this._onSelectAnswer(item)}
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
          <Text style={styles.title}>{item[`title_${i18n.language}`]}</Text>
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
            <Text style={{ fontWeight: '700' }}>{question[`question_${i18n.language}`]}</Text>
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
          <Text style={styles.topHeaderProgressLabel}>{this.props.t('CreateYourStoryScreen.Progress')}{" "}{this.state.current_question_index + 1}/{this.state.question_length}</Text>
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
    let answer = this.state.answer;
    let selected_answer = {};

    let selected_answer_weight = current_question.options.find(item => {
      return item.id == answer_id;
    })

    selected_answer = {
      id: selected_answer_weight.id,
      code: current_question.code,
      answers: answer,
    }

    return selected_answer;
  }

  _checkNextQuestionV2() {
    let current_question_index = this.state.current_question_index;
    let all_questions = this.state.questionnaires;

    let update_state = {
      answers: [...this.state.answers, {
        order: all_questions[current_question_index].order,
        code: all_questions[current_question_index].code,
        answers: [...this.state.answer]
      }]
    };

    let next_question_index = -1;

    for (let i = current_question_index + 1; i < all_questions.length; i++) {
      const question = all_questions[i];

      if (question.skip_logic !== null) {
        let operator = question.skip_logic.operator;

        if (operator == 'and') {
          let skip_flag = true;

          for (let j = 0; j < question.skip_logic.criterias.length; j++) {
            let criteria = question.skip_logic.criterias[j];

            var get_answer = update_state.answers.find(obj => {
              return obj.code == criteria.code;
            })

            if (!get_answer) {
              skip_flag = false;
              break;
            }

            if (criteria.operator == 'match_any') {

              const match_any = criteria.value.some(e => get_answer.answers.find(k => k.id == e) ? true : false);
              skip_flag &= match_any;

            } else if (criteria.operator == 'match_all') {

              const match_all = criteria.value.every(e => get_answer.answers.find(k => k.id == e) ? true : false);
              skip_flag &= match_all;

            }

          }

          if (skip_flag) {
            next_question_index = i;
          }

        } else if (operator == 'or') {
          let skip_flag = false;

          for (let j = 0; j < question.skip_logic.criterias.length; j++) {
            let criteria = question.skip_logic.criterias[j];

            var get_answer = update_state.answers.find(obj => {
              return obj.code == criteria.code;
            })

            if (get_answer) {
              if (criteria.operator == 'match_any') {

                const match_any = criteria.value.some(e => get_answer.answers.find(k => k.id == e) ? true : false);
                skip_flag |= match_any;

              } else if (criteria.operator == 'match_all') {

                const match_all = criteria.value.every(e => get_answer.answers.find(k => k.id == e) ? true : false);
                skip_flag |= match_all;

              }
            }
          }

          if (skip_flag) {
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
      update_state = {
        ...update_state,
        current_question_index: next_question_index,
        answer: []
      }

      this.setState(update_state);
    } else {
      let answers = update_state.answers;
      let total = 0;

      this.setState(update_state);

      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];

        for (let j = 0; j < answer.answers.length; j++) {
          let a = answer.answers[j];
          total += a.weight;
        }
      }

      total = parseFloat(total).toFixed(2);

      this._goTo('TestResultScreen', { total_weight: total });
    }

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
        answer
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
    let hasSelectedAnswer = this.state.answer.length > 0;
    return (
      <View style={[Style.boxShadow, styles.nextButton]}>
        <TouchableOpacity
          onPress={() => { hasSelectedAnswer ? this._checkNextQuestionV2() : null }}
          style={[styles.nextBtnAction, {
            backgroundColor: hasSelectedAnswer ? Color.pink : Color.gray,
          }]}
          activeOpacity={0.8}
        >
          <View style={{ width: 58 }} />
          <View style={styles.coverNextText}>
            <Text style={[styles.nextText, { color: hasSelectedAnswer ? Color.white : Color.textBlack }]}>{this.props.t('CreateYourStoryScreen.Next')}</Text>
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

    let getQuestion = realm.objects('Question');

    // console.log('getQuestion from realm : ', getQuestion);

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />
        {this._renderToolbar()}
        {this._renderHeader()}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          {/* {this._renderHeader()} */}
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


export default withTranslation()(CreateYourStory);