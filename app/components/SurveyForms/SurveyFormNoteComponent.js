import React, { useEffect, useState } from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

import { Color, FontFamily } from '../../assets/stylesheets/base_style';

const SurveyFormNoteComponent = (props) => {
  console.log('=== options = ', props.options)

  const renderItems = () => {
    return props.options.map(option => {
      return (
        <TouchableOpacity key={option.id}
          style={{borderBottomWidth: 1, borderBottomColor: Color.divideLineColor, flexDirection: 'row', minHeight: 56, alignItems: 'center', paddingVertical: 8}}
        >
          { option.imageSource &&
            <Image source={option.imageSource} style={{width: 38, height: 38}} />
          }
          <View style={{flex: 1}}>
            <Text numberOfLines={2} style={{color: Color.primary, fontFamily: FontFamily.body}}>
              {option.name}
            </Text>
          </View>
          <Icon name="chevron-right" color={Color.primary} size={24} />
        </TouchableOpacity>
      )
    })
  }

  return (
    <View>
      {renderItems()}
    </View>
  )
}

export default SurveyFormNoteComponent;