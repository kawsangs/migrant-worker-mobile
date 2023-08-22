import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FontFamily, FontSize } from '../assets/stylesheets/base_style';
import CustomAudioPlayerComponent from './shared/CustomAudioPlayerComponent';

class WelcomeMessage extends Component {
  renderAudioPlayer() {
    return <View style={{justifyContent: 'flex-start', paddingTop: 5}}>
              <CustomAudioPlayerComponent
                itemUuid='welcome-message-audio'
                audio='about_chc_mobile.mp3'
                buttonBackgroundColor={Color.primary}
                isOutline={true}
              />
           </View>
  }

  render() {
    return (
      <View style={[{marginTop: 5, marginBottom: -20}, this.props.containerStyle]}>
        { this.props.showTitle &&
          <Text style={[{fontFamily: FontFamily.title, fontSize: FontSize.title, textAlign: 'center'}, this.props.titleStyle]}>សូមស្វាគមន៍</Text>
        }

        <View style={{ flexDirection: 'row'}}>
          <Text style={[{flex: 1, paddingTop: 5, paddingRight: 6, textAlign: 'center', fontSize: 15}, this.props.contentStyle]}>
            ដំណើរឆ្លង​ដែន​របស់ខ្ញុំ គឺជា​កម្មវិធី​ប្រព័ន្ធ​ទូរស័ព្ទ (អ៊ែប)​ ដើម្បី​ជួយ​ដល់​អ្នក​ប្រើប្រាស់​អាច​រក​បាន​នូវ​ព័ត៌មាន​ដែល​មាន​សារៈសំខាន់​សម្រាប់​ការធ្វើ​ចំណាក​ស្រុក។
          </Text>

          { this.props.hasAudioButton && this.renderAudioPlayer() }
        </View>
      </View>
    )
  }
}

export default WelcomeMessage;