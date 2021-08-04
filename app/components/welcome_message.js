import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FontFamily, FontSize } from '../assets/stylesheets/base_style';

class WelcomeMessage extends Component {
  render() {
    return (
      <View style={[{marginTop: 5, marginBottom: -20}, this.props.containerStyle]}>
        { this.props.showTitle &&
          <Text style={{fontFamily: FontFamily.title, fontSize: FontSize.title, textAlign: 'center'}}>សូមស្វាគមន៍</Text>
        }
        <Text style={[{padding: 16, paddingTop: 5, textAlign: 'center', fontSize: 15}, this.props.contentStyle]}>
          ដំណើរឆ្លងដែនរបស់ខ្ញុំគឺជាកម្មវិធីប្រពន្ធ័ទូរស័ព្ទ (អ៊ែប) ដើម្បីជួយដល់អ្នកប្រើប្រាស់អាចរកបាននូវព័ត៌មានដែលមានសារៈ​សំខាន់សម្រាប់ការធ្វើចំណាកស្រុក
        </Text>
      </View>
    )
  }
}

export default WelcomeMessage;