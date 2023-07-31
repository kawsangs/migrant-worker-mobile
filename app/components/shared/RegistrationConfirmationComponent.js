import React, {useState} from 'react';
import {View, Linking, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BottomSheetModalContentComponent from './BottomSheetModalContentComponent';
import BigButtonComponent from './BigButtonComponent';
import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import {PRIVACY_POLICY_URL, TERMS_AND_CONDITIONS_URL} from '../../constants/url_constant';

const FONTSIZE = 15;

const RegistrationConfirmationComponent = (props) => {
  const renderUrl = (label, url) => {
    return <Text onPress={() =>  Linking.openURL(url)} style={{color: Color.primary, fontSize: 15}}>{label}</Text>
  }

  const renderButton = () => {
    return <BigButtonComponent
              label="យល់ព្រម"
              buttonStyle={{marginTop: 6}}
           />
  }

  const renderContent = () => {
    return <React.Fragment>
              <Text style={{lineHeight: 30, color: 'black', fontSize: FONTSIZE}}>
                សូមអានលក្ខខណ្ឌខាងក្រោម មុនពេលធ្វើការចុះឈ្មោះចូលប្រើប្រាស់កម្មវិធី សុខភាពយុវជន។ ដោយចុច
                <Text style={{fontFamily: FontFamily.title, fontSize: FONTSIZE}}> "យល់ព្រម" </Text>
                បញ្ចាក់ថាអ្នកបានអាន និងយល់ព្រមទៅនឹង {renderUrl('“គោលការណ៍ឯកជនភាព”', PRIVACY_POLICY_URL)} និង {renderUrl('“គោលការណ៍ និងលក្ខខណ្ឌ”', TERMS_AND_CONDITIONS_URL)} ប្រើប្រាស់កម្មវិធីសុខភាពយុវជន។
              </Text>
              <Text style={{color: 'red', marginTop: 20, textAlign: 'center', fontSize: FONTSIZE}}>ការសម្ងាត់ព័ត៌មាន និងសុវត្តិភាពអ្នកជាអាទិភាពរបស់យើង!</Text>
              {renderButton()}
           </React.Fragment>
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
    marginTop: -6,
    marginRight: 16,
    height: 38,
    width: 38
  },
})

export default RegistrationConfirmationComponent;