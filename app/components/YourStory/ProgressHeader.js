import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';

class ProgressHeader extends Component {
  _calculatePercentageProgressBar() {
    if (!this.props.questions.length) { return 0; }

    return ((this.props.currentIndex + 1) / this.props.questions.length * 100).toFixed(2);
  }

  render() {
    let progress_bar_width = this._calculatePercentageProgressBar();

    return (
      <View style={{ backgroundColor: Color.pink }}>
        <View style={styles.topHeaderContent}>
          <Text style={styles.topHeaderProgressLabel}>{this.props.t('CreateYourStoryScreen.Progress')}{" "}{this.props.currentIndex + 1}/{this.props.questions.length}</Text>
        </View>

        <View style={styles.topHeaderProgressBar}>
          <View style={{ width: `${progress_bar_width}%`, backgroundColor: Color.white }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
});

function mapStateToProps(state) {
  return {
    questions: state.questions,
    currentIndex: state.currentQuestionIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(ProgressHeader));
