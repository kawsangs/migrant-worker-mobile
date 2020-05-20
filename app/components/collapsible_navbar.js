/* ***Usage
  import CollapsibleNavbar from '../components/collapsible_navbar';

  export default class ABC extents React.Component {
    render() {
      return (
        <CollapsibleNavbar
          options={{
            title: 'ចំណាកស្រុកសុវត្ថិភាព ត្រូវមានអ្វីខ្លះ?',
            headerLeftButton: { onPress: () => {} }
            bodyContent: this._renderContent()
          }}
        />
      )
    }
  }
*/

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import { NavigationContext } from '@react-navigation/native';

const NAVBAR_HEIGHT = 56;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 0 });

export default class SafeMigration extends React.Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      ),
    };
  }

  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const {options} = this.props;
    const navigation = this.context;
    const onBackPress = !!options.headerLeftButton && !!options.headerLeftButton.onPress ? options.headerLeftButton.onPress : navigation.goBack;

    return (
      <View style={{flex: 1}}>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true },
          )}
          style={{flex: 1}}>

          <View style={[Style.container, styles.contentContainer]}>
            {options.bodyContent}
          </View>

        </Animated.ScrollView>

        <Animated.View style={[styles.navbar, {flexDirection: 'row'}, { transform: [{ translateY: navbarTranslate }] }]}>
          <Animated.View style={{opacity: navbarOpacity, backgroundColor: 'transparent'}}>
            <HeaderBackButton tintColor={'white'} onPress={() => onBackPress()} style={{opacity: navbarOpacity}}/>
          </Animated.View>

          <HeaderTitle tintColor={'white'} style={{fontFamily: FontFamily.title, marginLeft: 20, width: '75%', opacity: navbarOpacity}}>{options.title}</HeaderTitle>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: Color.primary,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
  title: {
    color: '#fff',
    fontFamily: FontFamily.title,
    fontSize: FontSize.body
  }
});
