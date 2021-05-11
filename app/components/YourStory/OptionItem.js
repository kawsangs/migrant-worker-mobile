import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import { RadioButton } from 'react-native-material-ui';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

class OptionItem extends Component {
  state = {};

  render() {
    let item = this.props.item;

    return (
      <RadioButton
        label={item.name}
        checked={ item.value == this.props.answer }
        value={item.value}
        onSelect={value => this.props.onSelect(value)}
      />
    );
  }
}

export default withTranslation()(OptionItem);
