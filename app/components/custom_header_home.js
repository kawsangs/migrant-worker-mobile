import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Color, FontSize } from '../assets/stylesheets/base_style';
import Images from '../utils/images';


const CustomHeaderHome = ({ }) => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerLeft}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.homepageText}>Homepage</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => null}
          activeOpacity={0.8}
        >
          <Image source={Images.notification} style={styles.notificationIcon} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,

    shadowColor: "#000",
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: FontSize.body,
    lineHeight: FontSize.body,
    fontWeight: '700',
  },
  homepageText: {
    fontSize: FontSize.title,
    lineHeight: FontSize.title,
    fontWeight: '700'
  },
  headerRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  notificationButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingRight: 0
  },
  notificationIcon: {
    width: 25,
    height: 25,
    borderColor: Color.textBlack,
  },
  notificationBadge: {
    width: 12,
    height: 12,
    backgroundColor: Color.primary,
    borderRadius: 6,
    zIndex: 1,
    position: 'absolute',
    top: 13,
    right: 0,
  }
});

export default CustomHeaderHome;
