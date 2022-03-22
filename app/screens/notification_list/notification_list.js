import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

import Notification from '../../models/Notification';
import NotificationItem from '../../components/Notification/notificationItem';
import ConfirmModal from '../../components/confirmModal';
import EmptyResult from '../looking_for_help/empty_result'
import uuidv4 from '../../utils/uuidv4';

import { connect } from 'react-redux';
import { setNotifications } from '../../actions/notificationAction';

class NotificationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      selectedUuid: null,
      showModal: false,
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

  deleteNotification = () => {
    Notification.destroy(this.state.selectedUuid);

    this.setState({
      showModal: false,
      notifications: Notification.all(),
      selectedUuid: null,
    })
  }

  showDeleteModal = (uuid) => {
    this.setState({
      showModal: true,
      selectedUuid: uuid
    })
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.notifications}
          renderItem={(notification, i) => 
            <NotificationItem navigation={this.props.navigation} notification={notification.item}
              showDeleteModal={this.showDeleteModal}
            />
          }
          keyExtractor={notification => uuidv4()}
          ListEmptyComponent={<EmptyResult message="មិនមានសារជូនដំណឹង" />}
          contentContainerStyle={{padding: 14, alignSelf: 'stretch'}}
          onRefresh={ () => this.loadNotification() }
          refreshing={ false }
        />

        <ConfirmModal
          message='តើអ្នកពិតជាចង់លុបសារជូន​ដំណឹង​នេះមែនទេ?'
          showModal={this.state.showModal}
          cancel={() => this.setState({ showModal: false })}
          confirm={() => this.deleteNotification()}
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