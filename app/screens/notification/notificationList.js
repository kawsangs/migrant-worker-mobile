import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

import Notification from '../../models/Notification';
import NotificationItem from '../../components/Notification/notificationItem';
import EmptyResult from '../looking_for_help/empty_result'
import uuidv4 from '../../utils/uuidv4';

import { connect } from 'react-redux';
import { setNotifications } from '../../actions/notificationAction';
import { Color } from '../../assets/stylesheets/base_style';

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

  componentWillUnmount() {
    this.props.setNotifications([]);
  }

  loadNotification() {
    const allNotifications = this.props.notifications.length > 0 ? this.props.notifications : Notification.all();

    this.setState({notifications: allNotifications});
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

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setNotifications: (notifications) => dispatch(setNotifications(notifications)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationList);