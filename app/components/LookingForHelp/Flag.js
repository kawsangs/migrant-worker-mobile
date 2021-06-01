import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';

const Flag = (props) => {
  return (
    <View style={[styles.flag, props.style]}>
      <Text>{props.country.emoji_flag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flag: {
    ...Style.card,
    width: 40,
    height: 40,
    borderRadius: 50,
    padding: 10,
    marginRight: 16,
    marginBottom: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Flag;
