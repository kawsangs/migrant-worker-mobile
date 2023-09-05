import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import CardItem from '../../components/SubCategory/CardItem';
import HintCard from '../../components/SubCategory/HintCard';
import ArrowDown from '../../components/SubCategory/ArrowDown';
import Departure from '../../models/Departure';
import Visit from '../../models/Visit';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

class SubCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: Departure.find(props.route.params['parent_id']),
      categories: Departure.getChildren(props.route.params['parent_id']),
      audioPlayer: null,
    };
  }

  componentWillUnmount() {
    this._clearAudioPlayer();
  }

  _clearAudioPlayer() {
    if (!!this.props.currentPlayingAudio)
      this.props.setCurrentPlayingAudio(null);
  }

  _onPress(item) {
    this._clearAudioPlayer();
    Visit.uploadDepartureDetailVisit(item.id, item.name)

    if (item.leaf) { 
      const pushAction = StackActions.push('LeafCategoryScreen', { title: item.name, parent_id: item.id });
      return this.props.navigation.dispatch(pushAction);
    }

    const pushAction = StackActions.push('SubCategoryScreen', { title: item.name, parent_id: item.id });
    this.props.navigation.dispatch(pushAction);
  }

  _renderCards() {
    let doms = this.state.categories.map((item, index) =>
      <CardItem
        key={index}
        onPress={() => this._onPress(item)}
        uuid={item.uuid}
        title={item.name}
        image={item.imageSource}
        audio={item.audio}
        number={index + 1}
      />
    );

    return doms;
  }

  _renderHintCard() {
    const { category, categories } = this.state;
    return (
      <HintCard
        totalItem={ categories.length }
        label={ category.hint }
        image={ category.hintImageSource }
        audio={ category.hint_audio }
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>

          <View style={[Style.container, { flex: 1, marginBottom: 0 }]}>
            { this._renderHintCard() }

            <ArrowDown />

            { this._renderCards() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPlayingAudio: state.currentPlayingAudio
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPlayingAudio: (uuid) => dispatch(setCurrentPlayingAudio(uuid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SubCategory));