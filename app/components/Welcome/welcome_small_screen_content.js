import React, { Component } from 'react';
import { View, Image, ImageBackground, Dimensions, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Images from '../../utils/images';

import { Color, Style } from '../../assets/stylesheets/base_style';
import WelcomeMessage from '../welcome_message';
import ButtonNav from '../button_nav';
import { HDPIRatio } from '../../constants/screen_size_constant';

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
    const contentFontSize = PixelRatio.get() <= HDPIRatio ? 11 : 14;

    return (
      <View style={{flexGrow: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1}}>
            <View style={{padding: 16, paddingTop: 0}}>
              <WelcomeMessage showTitle={true}
                audioPlayer={this.props.audioPlayer}
                updateAudioPlayer={(sound) => this.setState({ audioPlayer: sound })}
                hasAudioButton={false}
                titleStyle={{fontSize: 18}}
                contentStyle={{ fontSize: contentFontSize, paddingTop: 0 }}
              />
            </View>
            { this._renderButtonNavs() }

            <Image source={Images.spotlight_one_line_small} style={{width: "100%", height: 50, resizeMode: 'contain', marginTop: -8}}/>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <ImageBackground
              source={Images.welcome_bg}
              style={{width: Dimensions.get('screen').width, height: wp('100%')}}
              resizeMode='contain'
              imageStyle={{ borderWidth: 1}}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default WelcomeSmallScreenContent;