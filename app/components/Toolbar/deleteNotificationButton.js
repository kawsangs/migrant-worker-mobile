import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ConfirmModal from '../confirmModal';
import Notification from '../../models/Notification';

import { connect } from 'react-redux';
import { setNotifications } from '../../actions/notificationAction';


class DeleteNotificationButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    }
  }

  deleteNotification() {
    this.setState({ showModal: false }, () => {
      this.props.setNotifications([]);
      this.props.navigation.goBack();
    });

    setTimeout(() => {
      Notification.destroy(this.props.uuid);
    }, 100);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{padding: 16}}
          onPress={() => this.setState({ showModal: true })}
        >
          <Icon name={'delete'} size={30} style={{color: '#fff'}}/>
        </TouchableOpacity>

        <ConfirmModal
          message='តើអ្នកពិតជាចង់លុបសារជូន​ដំណឹង​នេះមែនទេ?'
          showModal={this.state.showModal}
          cancel={() => this.setState({ showModal: false })}
          confirm={() => this.deleteNotification()}
        />
      </View>
    );
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
)(DeleteNotificationButton);