import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import OutlineInfoIcon from '../OutlineInfoIcon';
import notificationHelper from '../../helpers/notification_helper';

class NotificationItem extends React.Component {
  render() {
    return (
      <View style={[Style.card, { marginBottom: 10 }]}>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <OutlineInfoIcon customIconContainerStyles={{width: 35, height: 35, alignSelf: 'center', marginRight: 10}}/>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.title}>{ this.props.notification.title }</Text>
            <Text style={{fontSize: 12, color: Color.gray, marginTop: 2 }}>
              { notificationHelper.getReceiveDateTime(this.props.notification.received_date) }
            </Text>
          </View>
        </View>

        <Text style={{fontSize: 12}}>{ this.props.notification.content }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.title,
    flex: 1,
    paddingRight: 10,
    fontSize: 14,
    alignSelf: 'center'
  }
})

export default NotificationItem;