import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';

const BigButtonComponent = (props) => {
  const onPress = () => {
    if (props.disabled) {
      !!props.onDisabledPress && props.onDisabledPress();
      return
    }

    !!props.onPress && props.onPress();
  }

  return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[styles.button, !!props.rightComponent && {paddingRight: 4}, props.disabled ? { backgroundColor: Color.gray } : {}, props.buttonStyle]}
      >
        {!!props.rightComponent && <View style={{ width: 58 }} /> }
        <View style={styles.labelContainer}>
          <Text style={[styles.label, props.disabled ? { color: 'black' } : {}]}>{props.label}</Text>
        </View>
        {!!props.rightComponent && props.rightComponent}
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    flexDirection: 'row'
  },
  label: {
    color: Color.white,
    fontFamily: FontFamily.title,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BigButtonComponent;