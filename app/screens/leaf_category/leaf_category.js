import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import * as Progress from 'react-native-progress';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import Images from '../../utils/images';

import Departure from '../../models/Departure';

import SoundPlayer from '../../components/sound_player';
import MiniSoundPlayer from '../../components/LeafCategory/miniSoundPlayer';
import CategoryAudioPlayer from '../../components/LeafCategory/categoryAudioPlayer';

const screenHeight = Dimensions.get('screen').height;

const tagsStyles = {
  h2: {
    fontFamily: FontFamily.title,
    fontWeight: "400",
    fontSize: 18,
  },
  div: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.body
  },
  li: {
    marginRight: 10
  }
}

let _this = null;

class LeafCategory extends Component {
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      category: Departure.find(props.route.params['parent_id']),
      showMiniPlayer: false,
      scrollY: new Animated.Value(screenHeight)
    };
  }

  _renderTitle() {
    return (
      <Text style={{fontFamily: FontFamily.title, fontSize: 18, textAlign: 'center', marginBottom: 25}}>
        {this.state.category.name}
      </Text>
    )
  }

  _renderPlayAudio() {
    return (
      <SoundPlayer
        filePath={this.state.category.audio}
        iconStyle={{tintColor: Color.white, color: 'black'}}
        iconSize={35}
        progressBarContainerStyle={{width: '100%'}}
      />
    )
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y >= 266 && !_this.state.showMiniPlayer) {
      _this.setState({
        showMiniPlayer: true,
        scrollY: new Animated.Value(screenHeight - 70)
      }, () => {
        Animated.timing(_this.state.scrollY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
    else if (event.nativeEvent.contentOffset.y < 266 && _this.state.showMiniPlayer) {
      _this.setState({ 
        showMiniPlayer: false,
        scrollY: new Animated.Value(screenHeight)
      }, () => {
        Animated.timing(_this.state.scrollY, {
          toValue: screenHeight,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  }

  render() {
    let image = this.state.category.imageSource || Images.default;

    const source = {
      html: `
      <h2>យោង​តាម​សេចក្ដី​ប្រកាសព័ត៌មាន​របស់​អគ្គនាយកដ្ឋានអត្តសញ្ញាណកម្មនៃក្រសួង​មហាផ្ទៃ ​តម្លៃលិខិត​ឆ្លង​ដែន​ធម្មតា ត្រូវបាន​កំណត់​ថ្លៃសេវាដូច​ខាង​ក្រោម​៖</h2>
      <ul style="margin-top: 20px">
        <li>១. សេវា​រយៈពេល ២០​ថ្ងៃ​ តម្លៃ ០១​ក្បាល ១០០​ដុល្លារ​អាមេរិក</li>
        <li>២. សេវា​រយៈពេល​ ១០​ថ្ងៃ តម្លៃ ០១​ក្បាល ១៥០​ដុល្លារ​អាមេរិក</li>
        <li>៣. ​សេវា​រយៈពេល ១​ថ្ងៃ តម្លៃ​ ០១​ក្បាល ២០០​ដុល្លារ​អាមេរិក</li>
      </ul>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. 
      </div>
      <div>
        Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </div>
      `
    };

    return (
      <CategoryAudioPlayer
        category={this.state.category}
        image={image}
        iconStyle={{tintColor: Color.white, color: 'black'}}
        iconSize={35}
        progressBarContainerStyle={{width: '100%'}}
      >
        { this._renderTitle() }

        {/* { !!this.state.category.description && */}
          <RenderHtml
            source={source}
            contentWidth={Dimensions.get('screen').width}
            tagsStyles={tagsStyles}
          />
        {/* } */}
      </CategoryAudioPlayer>
    )


    // return (
    //   <View style={[Style.container, { flex: 1, marginBottom: 0, marginHorizontal: 0 }]}>
    //     <Animated.ScrollView style={{flex:1, paddingHorizontal: 16}}
    //       contentContainerStyle={{paddingBottom: 70}}
    //       onScroll={this.handleScroll}
    //       scrollEventThrottle={26}
    //     >
    //       <ImageBackground
    //         source={image}
    //         style={[styles.cateImage]}
    //         resizeMode='contain'
    //       />

    //       { this._renderPlayAudio() }

    //       { this._renderTitle() }

    //       { !!this.state.category.description &&
    //         <RenderHtml
    //           source={{html: this.state.category.description}}
    //           contentWidth={Dimensions.get('screen').width}
    //           tagsStyles={tagsStyles}
    //         />
    //       }
    //     </Animated.ScrollView>

    //     { this.state.showMiniPlayer &&
    //       <MiniSoundPlayer image={image} title={this.state.category.name}
    //         containerStyle={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', transform: [{ translateY: this.state.scrollY }]}}
    //       />
    //     }
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  cateImage: {
    minHeight: 160,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
});

export default withTranslation()(LeafCategory);
