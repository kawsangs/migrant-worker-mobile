import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FontFamily, FontSize } from '../assets/stylesheets/base_style';
import PlaySound from './play_sound';

class WelcomeMessage extends Component {
  render() {
    return (
      <View style={[{marginTop: 5, marginBottom: -20}, this.props.containerStyle]}>
        { this.props.showTitle &&
          <Text style={{fontFamily: FontFamily.title, fontSize: FontSize.title, textAlign: 'center'}}>សូមស្វាគមន៍</Text>
        }

        <View style={{ flexDirection: 'row'}}>
          <Text style={[{flex: 1, paddingTop: 5, paddingRight: 6, textAlign: 'center', fontSize: 15}, this.props.contentStyle]}>
            ដំណើរឆ្លងដែនរបស់ខ្ញុំ គឺជាកម្មវិធីប្រព័ន្ធទូរស័ព្ទ (អ៊ែប) ដើម្បីជួយដល់អ្នកប្រើប្រាស់អាចរកបាននូវព័ត៌មានដែលមានសារៈ​សំខាន់សម្រាប់ការធ្វើចំណាកស្រុក។
          </Text>

          <View style={{justifyContent: 'center'}}>
            <PlaySound
              style={{marginBottom: 15}}
              filePath='about_chc_mobile.mp3'
              audioPlayer={this.props.audioPlayer}
              updateMainAudioPlayer={(sound) => this.props.updateAudioPlayer(sound)}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default WelcomeMessage;