import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import CustomAudioPlayerComponent from '../../components/shared/CustomAudioPlayerComponent';

class CardItem extends Component {
  render() {
    let image = this.props.image || Images.default;

    // console.log('cate = ', this.props.uuid)

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[Style.card, { margin: 8, marginBottom: 8, padding: 0 }]}
        { ...this.props }>

        <ImageBackground
          source={image}
          style={[{ flex: 1}]}>

          <View style={[Style.cardContent, { marginBottom: 0, paddingBottom: 0, minHeight: 160}]}>
            <View style={{ flex: 1 }} />

            <View style={{marginTop: 10, marginRight: 10}}>
              <CustomAudioPlayerComponent
                itemUuid={this.props.uuid}
                // audio={!!this.props.audio ? {uri: this.props.audio} : null}
                audio={this.props.audio}
                isFromAppBundle={true}
                buttonStyle={{backgroundColor: this.props.audioButtonBackground || Color.white}}
                iconStyle={{color: this.props.audioIconColor || Color.primary}}
                rippled={true}
              />

              {/* <PlaySound
                filePath={this.props.audio}
                buttonAudioStyle={[{backgroundColor: Color.white}, this.props.buttonAudioStyle]}
                iconStyle={[{tintColor: Color.primary}, this.props.audioIconStyle]}
                style={[{ marginTop: 10, marginRight: 10 }]}
                audioPlayer={this.props.audioPlayer}
                updateMainAudioPlayer={(sound) => this.props.updateAudioPlayer(sound)}
              /> */}
            </View>
          </View>
        </ImageBackground>

        <View style={styles.cardTitle}>
          <Text style={[styles.title]}>{this.props.title}</Text>
          { !this.props.hideArrow &&
            <Icon name='keyboard-arrow-right' size={24} />
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    backgroundColor: Color.primary,
  },
  cardTitle: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontFamily: FontFamily.title,
    color: Color.textBlack,
  },
});

export default CardItem;
