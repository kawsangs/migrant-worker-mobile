import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../../styles/registerScreenStyle';
import { Style } from '../../assets/stylesheets/base_style';

const RegisterTextInputComponent = (props) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={[styles.buttonWrapper, Style.boxShadow, {height: 64}]}>
        <View style={[styles.textInputWrapper, props.textContainerStyle]}>
          <Icon name={props.iconName} size={24} style={styles.inputIcon} />
          <TextInput
            placeholder={props.placeholder}
            style={styles.textInput}
            keyboardType={props.keyboardType || 'default'}
            onChangeText={value => props.onChange(value)}
            value={props.value}
          />
          <View style={{justifyContent: 'center', marginRight: 2}}>
            { props.audioButton() }
          </View>
        </View>
      </View>
    </View>
  )
}

export default RegisterTextInputComponent;