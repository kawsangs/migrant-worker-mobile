import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { StackActions } from '@react-navigation/native';
import { Color } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';

import Safety from '../../models/Safety';
import Visit from '../../models/Visit';
import CardItem from '../../components/YourSafety/CardItem';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

class YourSafetySubCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: Safety.getChildren(props.route.params['parent_id']),
    };
  }

  _onPress(item) {
    Visit.uploadSafetyDetailVisit(item.id);
    if (!!this.props.currentPlayingAudio)
      this.props.setCurrentPlayingAudio(null)

    if (item.leaf) {
      return this.props.navigation.navigate("YourSafetyLeafCategoryScreen", {title: item.name, parent_id: item.id});
    }

    const pushAction = StackActions.push('YourSafetySubCategoryScreen', { title: item.name, parent_id: item.id });
    this.props.navigation.dispatch(pushAction);
  }

  _renderItem(item, index) {
    return (
      <CardItem
        key={index}
        uuid={item.uuid}
        title={item.name}
        audio={item.audio}
        image={item.imageSource}
        onPress={() => this._onPress(item)}
        audioButtonBackground={Color.primary}
        audioIconColor={Color.white}
      />
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.categories}
        renderItem={(item, i) => this._renderItem(item.item, i)}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 8}}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPlayingAudio: state.currentPlayingAudio
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPlayingAudio: (uuid) => dispatch(setCurrentPlayingAudio(uuid))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(YourSafetySubCategory));