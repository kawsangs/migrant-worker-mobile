import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';

// import { Icon } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';

class CardItem extends Component {
  render() {
    let image = this.props.image || Images.default;

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
                audio={this.props.audio}
                isOutline={true}
                buttonBackgroundColor={this.props.audioButtonBackground}
              />
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
