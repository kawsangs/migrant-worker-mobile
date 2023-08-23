import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import AppIcon from '../AppIcon';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';
import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';

const YourStoryFinishComponent = (props) => {
  const navigation = useNavigation();

  const renderMessage = () => {
    return <View style={[Style.card]}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <AppIcon iconType='clap' customStyles={{ marginRight: 15 }}/>
                <Text style={{fontFamily: FontFamily.title, flex: 1}}>អបអរសារទរ</Text>
                <CustomAudioPlayerComponent
                  itemUuid='your-story-finish-message'
                  audio="congratulation_for_more_knowledge.mp3"
                  buttonBackgroundColor={Color.pink}
                  isOutline={true}
                />
              </View>

              <Text>អ្នកបានដឹងគន្លឹះសំខាន់ខ្លះៗ ដែលគាំទ្រអ្នកក្នុងការទទួលបានការងារដោយសុវត្ថិភាពនៅប្រទេសគោលដៅ</Text>
           </View>
  }

  const renderButtons = () => {
    return <View style={{position: 'absolute', bottom: 20, width: '100%'}}>
              { !!props.nextForm &&
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{backgroundColor: Color.pink, padding: 8, borderRadius: 8, flexDirection: 'row', width: '100%', justifyContent: 'center', marginBottom: 10}}
                  onPress={() => props.setForm()}
                >
                  <View style={{flex: 1}}/>
                  <Text style={{fontFamily: FontFamily.title, color: '#fff', textAlign: 'center'}}>ចូលទៅសាច់រឿង "{props.nextForm.name}"</Text>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Icon name={'arrow-forward'} style={{color: '#fff'}}/>
                  </View>
                </TouchableOpacity>
              }

              <TouchableOpacity
                activeOpacity={0.8}
                style={{backgroundColor: Color.pink, padding: 8, borderRadius: 8, flexDirection: 'row', width: '100%', justifyContent: 'center'}}
                onPress={() => navigation.goBack()}
              >
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                  <Icon name={'arrow-back'} style={{color: '#fff'}}/>
                </View>
                <Text style={{fontFamily: FontFamily.title, color: '#fff', textAlign: 'center'}}>ត្រឡប់ទៅកាន់ "សាច់រឿងរបស់អ្នក"</Text>
                <View style={{flex: 1}}/>
              </TouchableOpacity>
           </View>
  }

  return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
        {renderMessage()}
        {renderButtons()}
      </View>
    )
}

export default YourStoryFinishComponent;