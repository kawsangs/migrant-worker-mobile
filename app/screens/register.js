import React, { Component } from 'react';

import BottomSheetModalComponent from '../components/shared/BottomSheetModalComponent';
import RegisterFormComponent from '../components/Register/RegisterFormComponent';

import Sidekiq from '../models/Sidekiq';
import { addStatistic } from '../utils/statistic';
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUserAction';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser || {}
    };
    this.action = props.route.params.action || "register";
    this.modalRef = React.createRef();
  }

  render() {
    return <React.Fragment>
              <RegisterFormComponent
                currentUser={this.state.currentUser}
                action={this.action}
                modalRef={this.modalRef}
                navigation={this.props.navigation}
                setCurrentUser={(user) => this.props.setCurrentUser(user)}
              />
              <BottomSheetModalComponent ref={this.modalRef} />
           </React.Fragment>
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Register));