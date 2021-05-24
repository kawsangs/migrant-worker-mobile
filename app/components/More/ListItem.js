import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

class ListItem extends Component {
  render() {
    const { iconImage, title, avata } = this.props;

    return (
      <TouchableOpacity
        style={[Style.boxShadow, styles.menuItem]}
        activeOpacity={0.8}
        {...this.props}>

        <View style={styles.menuIconWrapper}>
          <Image source={avata} style={styles.menuIcon} />
        </View>

        <View style={styles.menuTitleWrapper}>
          <Text style={styles.menuTextTitle}>{title}</Text>
        </View>

        <View>
          { iconImage || <Image source={Images.next} style={styles.nextIcon} /> }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  nextIcon: {
    width: 15,
    height: 15,
    tintColor: Color.gray
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderBottomWidth: 1,
    borderBottomColor: Color.border
  },
  menuIconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: Color.white
  },
  menuTitleWrapper: {
    flex: 1,
    marginLeft: 16
  },
  menuTextTitle: {
    fontSize: 16,
  },
});

export default withTranslation()(ListItem);
