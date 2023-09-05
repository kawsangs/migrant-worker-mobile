import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';
import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import { InjectArray } from '../utils/math';
import { addStatistic } from '../utils/statistic';
import { withTranslation } from 'react-i18next';

import uuidv4 from '../utils/uuidv4';
import CardItem from '../components/Home/CardItem';
import homeMenuList from '../db/json/home_menu';
import {setCurrentPlayingAudio} from '../actions/currentPlayingAudioAction';
import Visit from '../models/Visit';

class Home extends Component {
  state = {};

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('blur', () => {
      if (this.state.audioPlayer) {
        this.state.audioPlayer.release();
        this.setState({ audioPlayer: null });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _goTo(item) {
    this.props.setCurrentPlayingAudio(null);
    addStatistic(`goTo${item.screenName.split('Screen')[0]}`);
    Visit.uploadPageVisit(item.code, item.name);
    this.props.navigation.navigate(item.screenName);
  }

  _renderCardItem(item) {
    return (
      <CardItem
        key={uuidv4()}
        item={item}
        image={item.image}
        backgroundColor={item.backgroundColor}
        onPress={ () => this._goTo(item) }
        audio={item.audio}
      />
    )
  }

  _renderCards() {
    let row1 = homeMenuList.slice(0, 2).map((item) => this._renderCardItem(item));
    let row2 = homeMenuList.slice(2, 4).map((item) => this._renderCardItem(item));
    let space = <View key={uuidv4()} style={{ width: 16 }}></View>;

    return (
      <View style={{ flex: 1 }}>
        <View style={Style.row}>
          { InjectArray(row1, space) }
        </View>

        <View style={{ height: 16 }}></View>

        <View style={Style.row}>
          { InjectArray(row2, space) }
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={[Style.container, { flex: 1 }]}>
        { this._renderCards()}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPlayingAudio: (uuid) => dispatch(setCurrentPlayingAudio(uuid)) 
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(Home));
