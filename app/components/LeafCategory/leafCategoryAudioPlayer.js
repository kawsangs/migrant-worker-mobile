import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView, Dimensions } from 'react-native';

import { FontFamily } from '../../assets/stylesheets/base_style';
import styles from '../../styles/categoryAudioPlayerComponentStyle';

import MiniSoundPlayer from './miniSoundPlayer';
import AudioProgressBar from './audioProgressBar';
import BottomHalfModal from '../bottomHalfModal';
import LeafCategoryAudioControlButtonsComponent from './LeafCategoryAudioControlButtonsComponent';
import audioPlayerService from '../../services/audio_player_service';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
let _this = this;

export default class LeafCategoryAudioPlayer extends Component {
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      showMiniPlayer: false,
      modalVisible: false,
      audioPlayer: null,
      playSeconds: 0,
      duration: 0,
      countInterval: null,
    }
  }

  componentWillUnmount() {
    if (!!this.state.audioPlayer && !!this.state.countInterval) {
      this.state.audioPlayer.release();
      clearInterval(this.state.countInterval);
      this.setState({ audioPlayer: null, playSeconds: 0, duration: 0, countInterval: null });
    }
  }

  updateState = (audioPlayer, playSeconds, duration, countInterval) => {
    this.setState({ audioPlayer, playSeconds, duration, countInterval })
  }

  _renderPlayerControlButtons() {
    return <LeafCategoryAudioControlButtonsComponent
              uuid={'testing-audio'}
              audio={this.props.category.audio}
              audioPlayer={this.state.audioPlayer}
              countInterval={this.state.countInterval}
              updateAudioPlayer={this.updateState}
              iconStyle={this.props.iconStyle}
              iconSize={this.props.iconSize}
              playAudio={() => this.playAudio()}
           />
  }

  _renderImage() {
    return (<ImageBackground source={this.props.image} style={styles.cateImage} resizeMode='contain' />)
  }

  _rendeProgressBar() {
    return (
      <AudioProgressBar
        audioPlayer={this.state.audioPlayer}
        duration={this.state.duration}
        playSeconds={this.state.playSeconds}
        countInterval={this.state.countInterval}
        updateAudioPlayer={this.updateState}
      />
    )
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y >= 266 && !_this.state.showMiniPlayer)
      _this.setState({ showMiniPlayer: true });
    else if (event.nativeEvent.contentOffset.y < 266 && _this.state.showMiniPlayer)
      _this.setState({ showMiniPlayer: false });
  }

  playAudio() {
    // Play/pause the audio if the audioPlayer is already initiated
    if (!!this.state.audioPlayer) {
      audioPlayerService.playPause(this.state.audioPlayer, this.state.countInterval, (audioPlayer, playSeconds, duration, countInterval) => {
        this.updateState(audioPlayer, playSeconds, duration, countInterval);
      });
      return;
    }

    audioPlayerService.play(this.props.category.audio, 'testing-audio', null, (audioPlayer, playSeconds, duration, countInterval) => {
      this.updateState(audioPlayer, playSeconds, duration, countInterval);
    });
  }

  _renderAudioPlayer() {
    return <React.Fragment>
              { this._renderImage() }
              { this._rendeProgressBar() }
              { this._renderPlayerControlButtons() }
           </React.Fragment>
  }

  _renderMiniPlayer() {
    return <View style={styles.miniSoundPlayerContainer}>
              <MiniSoundPlayer
                image={this.props.image}
                title={this.props.category.name}
                audio={this.props.category.audio}
                playAudio={() => this.playAudio()}
                countInterval={this.state.countInterval}
                openModal={() => this.setState({ modalVisible: true })}
              />
           </View>
  }

  _renderBottomSheetPlayer() {
    return <BottomHalfModal
              isVisible={this.state.modalVisible}
              closeModal={() => this.setState({ modalVisible: false })}
              modalContentStyle={{ height: screenHeight / 1.8 }}
           >
              <View>
                {this._renderAudioPlayer()}
                <Text numberOfLines={1} style={{fontFamily: FontFamily.title, fontSize: 18, textAlign: 'center', marginBottom: 25}}>
                  {this.props.category.name}
                </Text>
              </View>
           </BottomHalfModal>
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle, { width: screenWidth }]}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 90, width: screenWidth}} onScroll={this.handleScroll}>
          {this._renderAudioPlayer()}
          {this.props.children}
        </ScrollView>
        { this.state.showMiniPlayer && this._renderMiniPlayer()}
        { this._renderBottomSheetPlayer() }
      </View>
    )
  }
}