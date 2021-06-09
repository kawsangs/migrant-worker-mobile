import React from 'react';
import {
  Text,
  View
} from 'react-native';

import { Color, FontFamily, } from '../../assets/stylesheets/base_style';
import Notification from '../../models/Notification';

import { connect } from 'react-redux';
import { setNotifications } from '../../actions/notificationAction';

class NotificationDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: Notification.find(props.route.params.uuid),
    }
  }

  componentDidMount() {
    Notification.update(this.props.route.params.uuid, { is_read: true });
    this.props.setNotifications(Notification.all());
  }

  render() {
    return (
      <View style={{paddingHorizontal: 16}}>
        <Text style={{ fontFamily: FontFamily.title, textAlign: 'center', marginTop: 10 }}>
          { this.state.notification.title }
        </Text>

        <Text style={{marginTop: 16}}>
          { this.state.notification.content }
        </Text>
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
)(NotificationDetail);