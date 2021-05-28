import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Images from '../../utils/images';
import { addStatistic } from '../../utils/statistic';
import i18n from 'i18next';
import TranslationHelper from '../../translations';
import { withTranslation } from 'react-i18next';

import DeviceInfo from 'react-native-device-info';

class AppVersion extends Component {
  render() {
    return (
      <View style={styles.appVersion}>
        <Text>{this.props.t("MoreScreen.AppVersion")}: {DeviceInfo.getVersion()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appVersion: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  }
});

export default withTranslation()(AppVersion);
