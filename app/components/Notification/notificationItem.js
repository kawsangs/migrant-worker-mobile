import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import OutlineInfoIcon from '../OutlineInfoIcon';
import notificationHelper from '../../helpers/notification_helper';

class NotificationItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationDetailScreen', { uuid: this.props.notification.uuid })}
        style={[Style.card, { marginBottom: 10 }]}
      >
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <OutlineInfoIcon customIconContainerStyles={{width: 35, height: 35, alignSelf: 'center', marginRight: 10}}/>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.title}>{ this.props.notification.title }</Text>
            <Text style={{fontSize: 12, color: Color.gray, alignSelf: 'center' }}>
              { notificationHelper.getReceiveDateTime(this.props.notification.received_date) }
            </Text>
          </View>
        </View>

        <View style={{borderWidth: 0, flexDirection: 'row', alignItems: 'center'}}>
          <Text numberOfLines={1} style={{fontSize: 12, flex: 1}}>{ this.props.notification.content }</Text>
          { !this.props.notification.is_read &&
            <View style={styles.badge} />
          }
        </View>
      </TouchableOpacity>
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
  },
  badge: {
    width: 10,
    height: 10,
    backgroundColor: Color.primary,
    borderRadius: 10,
    marginLeft: 5
  }
})

export default NotificationItem;