import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Notification from '../../models/Notification';
import NotificationItem from '../../components/Notification/notificationItem';
import EmptyResult from '../looking_for_help/empty_result'
import uuidv4 from '../../utils/uuidv4';

class NotificationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    this.loadNotification();
  }

  loadNotification() {
    this.setState({ notifications: Notification.all()}, () => {
      Notification.markAsRead();
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.notifications}
          renderItem={(notification, i) => <NotificationItem navigation={this.props.navigation} notification={notification.item} /> }
          keyExtractor={notification => uuidv4()}
          ListEmptyComponent={<EmptyResult message="មិនមានសារផ្ដល់ដំណឹង" />}
          contentContainerStyle={{padding: 16, alignSelf: 'stretch'}}
          onRefresh={ () => this.loadNotification() }
          refreshing={ false }
        />
      </View>
    )
  }
}

export default NotificationList;