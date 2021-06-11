import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Moment from 'moment';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import Notification from '../../models/Notification';
import { getTranslatedDate } from '../../utils/datetime';

import { connect } from 'react-redux';
import { setNotifications } from '../../actions/notificationAction';

class NotificationDetail extends Component {
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

  componentWillUnmount() {
    this.props.setNotifications(Notification.all());
  }

  _renderReceivedDatetime() {
    return (
      <Text style={{fontSize: 13, color: Color.gray}}>
        { getTranslatedDate(this.state.notification.received_date) }  { Moment(this.state.notification.received_date).format('hh:mm A') }
      </Text>
    )
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor={Color.primary} />

        <ScrollView contentContainerStyle={{paddingBottom: 50, paddingTop: 16, paddingHorizontal: 16}}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            { this.state.notification.title }
          </Text>
          { this._renderReceivedDatetime() }

          <Text style={{marginTop: 40}}>
            { this.state.notification.content }
          </Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.title,
    fontSize: 18,
  }
});

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