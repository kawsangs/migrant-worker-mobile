import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';
import { connect } from 'react-redux';

class UserProfile extends Component {
  render() {
    let currentUser = this.props.currentUser || {};
    let sex = currentUser.sex || "other";

    return (
      <TouchableOpacity style={[Style.boxShadow, styles.profileStyle]}
        onPress={() => this.props.navigation.navigate('UserFormScreen', {action: "edit"})}
        activeOpacity={0.8}>

        <View style={styles.profileImageWrapper}>
          <Image source={Images[sex]} style={styles.profileImage} />
        </View>

        <View style={styles.profileDescription}>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userEditText}>{this.props.t('MoreScreen.Edit')}</Text>
        </View>

        <View>
          <Image source={Images.next} style={styles.nextIcon} />
        </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  profileStyle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white
  },
  profileImageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: 'red'
  },
  profileDescription: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 16
  },
  userName: {
    fontSize: 18,
    fontFamily: FontFamily.title,
    marginBottom: -4
  },
  userEditText: {
    color: Color.gray,
    fontSize: 14
  },
  nextIcon: {
    width: 15,
    height: 15,
    tintColor: Color.gray
  },
});


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(UserProfile));
