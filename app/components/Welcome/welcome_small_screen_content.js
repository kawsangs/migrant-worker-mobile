import React, { Component } from 'react';
import { View, Image, ImageBackground, Dimensions } from 'react-native';

import Images from '../../utils/images';
import { backgroundImageTopPosition } from '../../utils/image_style';

import { Color, Style } from '../../assets/stylesheets/base_style';
import WelcomeMessage from '../welcome_message';
import ButtonNav from '../button_nav';

const screenHeight = Dimensions.get('screen').height;

class WelcomeSmallScreenContent extends Component {
  _renderButtonNavs() {
    return (
      <View style={[Style.container, {marginTop: 0}]}>
        <ButtonNav
          active={true}
          title={"ចុះឈ្មោះ"}
          icon={"person"}
          audio={'register.mp3'}
          audioPlayer={this.props.audioPlayer}
          updateAudioPlayer={(sound) => this.props.updateAudioPlayer(sound)}
          onPress={() => this.props.register()}
          iconSize={24}
          buttonWrapperStyle={{ marginTop: 14 }}
          textWrapperStyle={{ padding: 6 }}
          textStyle={{fontSize: 14}}
          audioWrapperStyle={{ padding: 0, paddingRight: 16 }}
          playSoundSize={{width: 26, height: 26}}
        />

        <ButtonNav
          active={true}
          title={"បន្តចូលមើល ជាភ្ញៀវ"}
          image={"head_profile"}
          iconSet={'MaterialCommunityIcons'}
          audio={"login_as_guest.mp3"}
          audioPlayer={this.props.audioPlayer}
          updateAudioPlayer={(sound) => this.props.updateAudioPlayer(sound)}
          onPress={() => this.props.loginAsGuest()}
          buttonColor="#e44977"
          iconSize={24}
          buttonWrapperStyle={{ marginTop: 14 }}
          textWrapperStyle={{ padding: 6 }}
          textStyle={{fontSize: 14}}
          audioWrapperStyle={{ padding: 0, paddingRight: 16 }}
          playSoundSize={{width: 26, height: 26}}
          imageStyle={{width: 20, height: 24}}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ImageBackground
          source={Images.welcome_bg}
          style={{ width: '100%', height: '100%', backgroundColor: '#fff'}}
          imageStyle={{
            borderWidth: 1,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            top: backgroundImageTopPosition(screenHeight)
          }}
        >

          <View style={{padding: 16, paddingTop: 0}}>
            <WelcomeMessage showTitle={true}
              audioPlayer={this.props.audioPlayer}
              updateAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
              hasAudioButton={false}
              titleStyle={{fontSize: 18}}
              contentStyle={{fontSize: 14, paddingTop: 0}}
            />
          </View>
          { this._renderButtonNavs() }

          <View style={{paddingHorizontal: 16, marginTop: -28}}>
            <Image source={Images.spotlight_one_line_small} style={{width: "100%", height: 100, resizeMode: 'contain'}}/>
          </View>

          { this.props.videoButton }
        </ImageBackground>
      </View>
    )
  }
}

export default WelcomeSmallScreenContent;