import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import OutlineInfoIcon from '../OutlineInfoIcon';

class NotificationItem extends React.Component {
  render() {
    return (
      <View style={[Style.card, { marginBottom: 10 }]}>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <OutlineInfoIcon customIconContainerStyles={{width: 38, height: 38, alignSelf: 'center', marginRight: 10}}/>

          <View style={{flex: 1}}>
            <Text style={styles.title} numberOfLines={1}>{ this.props.notification.title }</Text>
            <Text style={{fontSize: 13, color: Color.gray}}>
              {Moment(this.props.notification.received_date).format('DD/MM/YYYY')} | {Moment(this.props.notification.received_date).format('hh:mm A')}
            </Text>
          </View>
        </View>

        <Text style={{fontSize: 12}} numberOfLines={2}>{ this.props.notification.content }</Text>
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
  }
})

export default NotificationItem;