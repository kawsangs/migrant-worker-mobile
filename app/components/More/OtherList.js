import React, { Component } from 'react';
import { View, Text, Share, Linking } from 'react-native';

import Images from '../../utils/images';
import { addStatistic } from '../../utils/statistic';
import i18n from 'i18next';
import TranslationHelper from '../../translations';
import { withTranslation } from 'react-i18next';
import { environment } from '../../config/environment';
import endpointHelper from '../../helpers/endpoint_helper';

import ListItem from './ListItem';

class Other extends Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message: environment.serverUrl,
        url: environment.serverUrl,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  openLink(url) {
    if (!url) { return; }

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert(`មិនអាចបើកតំណនេះ (${url})`);
      }
    });
  }

  render() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 5 }}>
          <Text>ផ្សេងៗ</Text>
        </View>

        <ListItem
          title={"ចែកចាយ/ចែករំលែកអ៊ែប"}
          avata={Images.share}
          onPress={() => this.onShare() }
        />

        <ListItem
          title={"គោលការណ៍អំពីឯកជនភាព"}
          avata={Images.doc}
          onPress={() => this.openLink(endpointHelper.getAbsoluteEndpoint('privacy-policy'))}
        />

        <ListItem
          title={"គោលការណ៍ និងលក្ខខណ្ឌ"}
          avata={Images.doc}
          onPress={() => this.openLink(endpointHelper.getAbsoluteEndpoint('terms-and-conditions'))}
        />
      </View>
    );
  }
}

export default withTranslation()(Other);
