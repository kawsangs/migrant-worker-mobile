/* ***Usage
  import CollapsibleNavbar from '../components/collapsible_navbar';

  export default class ABC extents React.Component {
    render() {
      return (
        <CollapsibleNavbar
          options={{
            header: <View></View>
            title: 'ចំណាកស្រុកសុវត្ថិភាព ត្រូវមានអ្វីខ្លះ?',
            headerLeftButton: { onPress: () => {} },
            bodyContent: this._renderContent(),
            scrollType: 'FlatList',
            flatListProps: {}
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
  ScrollView,
  FlatList
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import { NavigationContext } from '@react-navigation/native';
import LoadingIndicator from '../components/loading_indicator';

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

  _renderLoading() {
    return (
      <View style={styles.loadingLayer}>
        <LoadingIndicator loading={true}/>
      </View>
    );
  }

  // None collapsible header
  _renderHeader() {
    const {options} = this.props;
    const navigation = this.context;
    const onBackPress = !!options.headerLeftButton && !!options.headerLeftButton.onPress ? options.headerLeftButton.onPress : navigation.goBack;

    if (!!options.header) {
      return (
        <Animated.View style={[styles.navbar, {flexDirection: 'row'}, {  }]}>
          { options.header }
        </Animated.View>
      )
    }

    return(
      <Animated.View style={[styles.navbar, {flexDirection: 'row'}]}>
        <Animated.View style={{backgroundColor: 'transparent'}}>
          <HeaderBackButton tintColor={'white'} onPress={() => onBackPress()}/>
        </Animated.View>

        <HeaderTitle tintColor={'#fff'} style={[styles.title]}>{options.title}</HeaderTitle>
      </Animated.View>
    )
  }

  // Collapsible header
  // _renderHeader() {
  //   const { clampedScroll } = this.state;
  //   const navbarTranslate = clampedScroll.interpolate({
  //     inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
  //     outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
  //     extrapolate: 'clamp',
  //   });

  //   const navbarOpacity = clampedScroll.interpolate({
  //     inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
  //     outputRange: [1, 0],
  //     extrapolate: 'clamp',
  //   });
  //   const {options} = this.props;
  //   const navigation = this.context;
  //   const onBackPress = !!options.headerLeftButton && !!options.headerLeftButton.onPress ? options.headerLeftButton.onPress : navigation.goBack;

  //   if (!!options.header) {
  //     return (
  //       <Animated.View style={[styles.navbar, {flexDirection: 'row'}, { transform: [{ translateY: navbarTranslate }] }]}>
  //         { options.header }
  //       </Animated.View>
  //     )
  //   }

  //   return(
  //     <Animated.View style={[styles.navbar, {flexDirection: 'row'}, { transform: [{ translateY: navbarTranslate }] }]}>
  //       <Animated.View style={{opacity: navbarOpacity, backgroundColor: 'transparent'}}>
  //         <HeaderBackButton tintColor={'white'} onPress={() => onBackPress()} style={{opacity: navbarOpacity}}/>
  //       </Animated.View>

  //       <HeaderTitle tintColor={'#fff'} style={[styles.title, {opacity: navbarOpacity}]}>{options.title}</HeaderTitle>
  //     </Animated.View>
  //   )
  // }

  renderItem(item) {
    return (
      <View><Text></Text></View>
    );
  }

  _handleRenderFlatList() {
    const {options} = this.props;

    if(!!options.noResultContent) {
      return (options.noResultContent)
    }

    return (
      <Animated.FlatList
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
          { useNativeDriver: true },
        )}
        style={styles.contentContainer}
        {...this.props.options.bodyContentProps}
        contentContainerStyle={[this.props.options.bodyContentProps.contentContainerStyle, {paddingBottom: NAVBAR_HEIGHT}]}
      />
    )
  }

  _renderBody() {
    const {options} = this.props;

    if (options.bodyContentType == 'FlatList') {
      return this._handleRenderFlatList();
    }

    return (
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
          { useNativeDriver: true },
        )}
        style={{flex: 1}}>

        <View style={[Style.container, styles.contentContainer, { ...options.style }]}>
          {options.bodyContent}
        </View>
      </Animated.ScrollView>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this._renderHeader() }
        { this._renderBody() }
        { this.props.options.loading && this._renderLoading() }
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
    zIndex: 1
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT,
  },
  title: {
    fontFamily: FontFamily.title,
    marginLeft: 20,
    width: '75%'
  },
  loadingLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
});
