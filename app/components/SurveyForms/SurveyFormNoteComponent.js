import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

import { Color, FontFamily, FontSize } from '../../assets/stylesheets/base_style';
import DownloadedImage from '../../models/DownloadedImage';

const SurveyFormNoteComponent = (props) => {
  const onPress = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported)
        Linking.openURL(url);
      else
        alert(`មិនអាចបើកតំណនេះ`);
    });
  }

  const renderItems = () => {
    return props.options.map(option => {
      const icon = DownloadedImage.getImagePath(option.icon);
      return (
        <TouchableOpacity key={option.id}
          onPress={() => onPress(option.value)}
          style={{borderBottomWidth: 1, borderBottomColor: Color.divideLineColor, flexDirection: 'row', minHeight: 56, alignItems: 'center', paddingVertical: 8}}
        >
          { icon &&
            <Image source={!!icon ? {uri: icon} : null} resizeMode='contain'
              style={{width: 34, height: 34}}
            />
          }
          <View style={{flex: 1, paddingLeft: 12}}>
            <Text numberOfLines={2} style={{color: Color.primary, fontFamily: FontFamily.body, fontSize: FontSize.small}}>
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