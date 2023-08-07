import React, {useState} from 'react';
import {View, Linking, Text, StyleSheet, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import BottomSheetModalContentComponent from './BottomSheetModalContentComponent';
import BigButtonComponent from './BigButtonComponent';
import PlaySound from '../play_sound';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import {PRIVACY_POLICY_URL, TERMS_AND_CONDITIONS_URL} from '../../constants/url_constant';
import { HDPIRatio } from '../../constants/screen_size_constant';
import {isSmallScreenDevice} from '../../utils/responsive_util';

const smallScreenContent = PixelRatio.get() <= HDPIRatio ? 11 : 14;
const smallScreenTitle = PixelRatio.get() <= HDPIRatio ? 14 : 15;

const RegistrationConfirmationComponent = (props) => {
  const contentFontSize = isSmallScreenDevice() ? smallScreenContent : 15;
  const titleFontSize = isSmallScreenDevice() ? smallScreenTitle : 16;

  const [audioPlayer, setAudioPlayer] = useState(null)

  const renderUrl = (label, url) => {
    return <Text onPress={() =>  Linking.openURL(url)} style={{color: Color.primary, fontSize: contentFontSize}}>{label}</Text>
  }

  const renderButton = () => {
    return <BigButtonComponent
              label="យល់ព្រម"
              buttonStyle={{marginTop: 6, paddingRight: 16}}
              rightComponent={renderAudioBtn('confirm.mp3', {backgroundColor: Color.white}, {tintColor: Color.primary})}
              onPress={() => props.onPress()}
           />
  }

  const renderContent = () => {
    return <React.Fragment>
              <Text style={{lineHeight: 30, color: 'black', fontSize: contentFontSize}}>
                សូមអានលក្ខខណ្ឌខាងក្រោម មុនពេលធ្វើការចុះឈ្មោះចូលប្រើប្រាស់កម្មវិធី ដំណើរឆ្លងដែនរបស់ខ្ញុំ។ ដោយចុច
                <Text style={{fontFamily: FontFamily.title, fontSize: contentFontSize}}> "យល់ព្រម" </Text>
                បញ្ចាក់ថាអ្នកបានអាន និងយល់ព្រមទៅនឹង {renderUrl('“គោលការណ៍ឯកជនភាព”', PRIVACY_POLICY_URL)} និង {renderUrl('“គោលការណ៍ និងលក្ខខណ្ឌ”', TERMS_AND_CONDITIONS_URL)} ប្រើប្រាស់កម្មវិធីដំណើរឆ្លងដែនរបស់ខ្ញុំ។
              </Text>
              <Text style={{color: 'red', marginTop: 20, textAlign: 'center', fontSize: contentFontSize}}>ការសម្ងាត់ព័ត៌មាន និងសុវត្តិភាពអ្នកជាអាទិភាពរបស់យើង!</Text>
              {renderButton()}
           </React.Fragment>
  }

  const renderAudioBtn = (filePath, btnStyle = {}, iconStyle = {}) => {
    return (
      <PlaySound
        filePath={filePath}
        audioPlayer={audioPlayer}
        updateMainAudioPlayer={(sound) => setAudioPlayer(sound)}
        buttonAudioStyle={btnStyle}
        iconStyle={iconStyle}
      />
    )
  }

  const renderIcon = () => {
    return <View style={styles.infoIcon}>
              <Icon name="exclamation" size={18} color={Color.pink} />
           </View>
  }

  return (
    <BottomSheetModalContentComponent
      title='លក្ខខណ្ឌចុះឈ្មោះប្រើប្រាស់'
      titleIcon={renderIcon()}
      titleStyle={{flex: 1, marginTop: 2, fontSize: titleFontSize}}
      audioButton={renderAudioBtn('register.mp3')}
      titleContainerStyle={{marginBottom: 6}}
    >
      {renderContent()}
    </BottomSheetModalContentComponent>
  )
}

const styles = StyleSheet.create({
  infoIcon: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.pink,
    borderRadius: 40,
    justifyContent: 'center',
    marginTop: -4,
    marginRight: 16,
    height: 38,
    width: 38
  },
})

export default RegistrationConfirmationComponent;