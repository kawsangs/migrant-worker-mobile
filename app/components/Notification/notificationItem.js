import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';

import { Color, FontFamily, } from '../../assets/stylesheets/base_style';

class NotificationItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => { this.props.navigation.navigate('NotificationDetailScreen', { uuid: this.props.notification.uuid }) }}
        style={styles.container}
      >
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title} numberOfLines={1}>{ this.props.notification.title }</Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 13, color: Color.gray}}>{Moment(this.props.notification.received_date).format('DD/MM/YYYY')}</Text>
            { !this.props.notification.is_read &&
              <View style={styles.badge} />
            }
          </View>
        </View>
        <Text style={{fontSize: 14, color: Color.gray}} numberOfLines={1}>{ this.props.notification.content }</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
  },
  title: {
    fontFamily: FontFamily.title,
    flex: 1,
    paddingRight: 10,
    fontSize: 14,
  },
  badge: {
    alignSelf: 'center',
    marginTop: -4,
    marginLeft: 8,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: Color.primary,
  }
})

export default NotificationItem;