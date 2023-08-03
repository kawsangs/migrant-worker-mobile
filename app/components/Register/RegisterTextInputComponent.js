import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'react-native-material-ui';

import PlaySound from '../play_sound';
import styles from '../../styles/registerScreenStyle';
import { Color, Style } from '../../assets/stylesheets/base_style';

const RegisterTextInputComponent = (props) => {
  const renderAudioButton = () => {
    return (
      <PlaySound
        style={styles.buttonAudioWrapper}
        buttonAudioStyle={{ backgroundColor: Color.primary }}
        iconStyle={{ tintColor: Color.white }}
        filePath={props.audio}
        audioPlayer={props.audioPlayer}
        updateMainAudioPlayer={(sound) => props.updateAudioPlayer(sound)}
      />
    )
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={[styles.buttonWrapper, Style.boxShadow]}>
        <View style={[styles.textInputWrapper, props.textContainerStyle]}>
          <Icon name={props.iconName} size={24} style={styles.inputIcon} />
          <TextInput
            placeholder={props.placeholder}
            style={styles.textInput}
            keyboardType={props.keyboardType || 'default'}
            onChangeText={value => props.onChange(value)}
            value={props.value}
          />
          {renderAudioButton()}
        </View>
      </View>
    </View>
  )
}

export default RegisterTextInputComponent;