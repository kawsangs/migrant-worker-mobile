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

class UserProfile extends Component {
  render() {
    return (
      <TouchableOpacity style={[Style.boxShadow, styles.profileStyle]}
        // onPress={() => this._goTo('ProfileScreen')}
        activeOpacity={0.8}
      >
        <View style={styles.profileImageWrapper}>
          <Image source={Images.female} style={styles.profileImage} />
        </View>

        <View style={styles.profileDescription}>
          <Text style={styles.userName}>Dara</Text>
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
    fontWeight: '700'
  },
  userEditText: {
    color: Color.gray
  },
  nextIcon: {
    width: 15,
    height: 15,
    tintColor: Color.gray
  },
});

export default withTranslation()(UserProfile);
