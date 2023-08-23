import React, { Component } from 'react';
import { View, Image, ImageBackground, Dimensions, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '../../utils/images';

import { Color, Style } from '../../assets/stylesheets/base_style';
import WelcomeMessage from '../welcome_message';
import ButtonNav from '../button_nav';
import { HDPIRatio } from '../../constants/screen_size_constant';
import BottomSheetModalComponent from '../shared/BottomSheetModalComponent';
import RegistrationConfirmationComponent from '../shared/RegistrationConfirmationComponent';

const contentFontSize = PixelRatio.get() <= HDPIRatio ? 11 : 14;

class WelcomeSmallScreenContent extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  confirmConsentForm() {
    this.modalRef.current?.dismiss();
    this.props.loginAsGuest()
  }

  showConsentForm() {
    this.modalRef.current?.setContent(<RegistrationConfirmationComponent onPress={() => this.confirmConsentForm()} />);
    this.modalRef.current?.present()
  }

  _renderButtonNavs() {
    return (
      <View style={[Style.container, {marginTop: 0}]}>
        <ButtonNav
          audioUuid="register"
          active={true}
          title={"ចុះឈ្មោះ"}
          icon={"person"}
          audio={'register.mp3'}
          onPress={() => this.props.register()}
          iconSize={24}
          buttonWrapperStyle={{ marginTop: 14 }}
          textWrapperStyle={{ padding: 6 }}
          textStyle={{fontSize: 14}}
          audioWrapperStyle={{ padding: 0, paddingRight: 16 }}
          playSoundSize={{width: 26, height: 26}}
        />

        <ButtonNav
          audioUuid="register-as-guest"
          active={true}
          title={"បន្តចូលមើល ជាភ្ញៀវ"}
          image={"head_profile"}
          iconSet={<MaterialCommunityIcon/>}
          audio={"login_as_guest.mp3"}
          onPress={() => this.showConsentForm()}
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
      <View style={{flexGrow: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1}}>
            <View style={{padding: 16, paddingTop: 0}}>
              <WelcomeMessage showTitle={true}
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
        <BottomSheetModalComponent ref={this.modalRef} />
      </View>
    )
  }
}

export default WelcomeSmallScreenContent;