import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

class ProgressHeader extends Component {
  _calculatePercentageProgressBar() {
    // Todo: change question_length;
    let question_length = 9;
    // let progress_percentage = Math.round(((this.state.current_question_index + 1) * 100) / question_length);
    let progress_percentage = 0.3;

    return progress_percentage;
  }

  render() {
    let progress_bar_width = this._calculatePercentageProgressBar();

    return (
      <View style={{ backgroundColor: Color.pink }}>
        <View style={styles.topHeaderContent}>
          <Text style={styles.topHeaderProgressLabel}>{this.props.t('CreateYourStoryScreen.Progress')}{" "}{1 + 1}/{9}</Text>
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

export default withTranslation()(ProgressHeader);
