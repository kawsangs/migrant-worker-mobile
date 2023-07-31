import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import DashedLineComponent from './DashedLineComponent';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import { defaultContentHeight } from '../../constants/modal_constant';
import {isLowPixelDensityDevice} from '../../utils/responsive_util';

const BottomSheetModalMainComponent = (props) => {
  const renderHeader = () => {
    return <View style={[{height: isLowPixelDensityDevice() ? 48 : 50, paddingTop: 6, flexDirection: 'row', paddingHorizontal: 16}, props.titleContainerStyle]}>
              {!!props.titleIcon && props.titleIcon}
              <Text color='#fff' style={[{fontFamily: FontFamily.title, fontSize: 17 }, props.titleStyle]}>{props.title}</Text>
              {!!props.audioButton && props.audioButton}
           </View>
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View>
        { props.customTitle ? props.customTitle : renderHeader()}
        <DashedLineComponent/>
      </View>
      { props.topComponent && props.topComponent() }
      <ScrollView contentContainerStyle={[styles.scrollViewContainer, props.scrollViewStyle]} >
        {props.children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: defaultContentHeight,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
})

export default BottomSheetModalMainComponent;