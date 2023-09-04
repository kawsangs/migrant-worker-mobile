import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import { HeaderBackButton } from '@react-navigation/elements';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';

const SurveyFormNavHeaderComponent = (props) => {
  const renderTitle = () => {
    return <TextTicker
              style={{color: Color.white, fontSize: 20, fontFamily: FontFamily.title}}
              loop
              bounce={false}
              repeatSpacer={60}
              marqueeDelay={2000}
              scrollSpeed={20}
              shouldAnimateTreshold={16}
           >
              {props.title}
           </TextTicker>
  }

  return (
    <Appbar.Header style={{backgroundColor: Color.primary}}>
      <HeaderBackButton tintColor={"#fff"} onPress={() => props.onPressBack()} style={{marginLeft: 7}}/>
      {renderTitle()}
      <View style={{width: 16}} />
    </Appbar.Header>
  )
}

export default SurveyFormNavHeaderComponent;