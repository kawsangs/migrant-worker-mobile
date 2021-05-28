import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ToastAndroid,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import NetInfo from "@react-native-community/netinfo";
import { withTranslation } from 'react-i18next';
import EmptyResult from './empty_result';
import Country from '../../models/Country';
import InstitutionService from '../../services/institution_service'
import Flag from '../../components/LookingForHelp/Flag';
import CardItem from '../../components/LookingForHelp/CardItem';
import Filter from '../../components/LookingForHelp/Filter';

class LookingForHelp extends React.Component {
  constructor(props) {
    super(props);
    let country = Country.find(props.route.params.id);

    this.state = {
      country: country,
      isFetching: false,
      institutions: country.institutions,
    }
  }

  _renderHeader() {
    return (
      <View>
        <Filter
          country_id={this.props.route.params.id}
          onChangeQuery={(result) => this.setState({institutions: result})}/>

        <View style={{flexDirection: 'row', marginHorizontal: 16, marginBottom: 16}}>
          <Flag country={this.state.country} />
          <Text style={{fontFamily: FontFamily.title}}>{this.state.country.name}</Text>
        </View>
      </View>
    )
  }

  pullToReload() {
    this.setState({isFetching: true});
    this.checkInternet(async () => {
      let updatedCount = await InstitutionService.fetch(this.state.country.id)
      this.setState({isFetching: false});
    })
  }

  checkInternet(callback) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});
        alert("No internet connection");
        return
      }

      callback();
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.yellow} />

        <FlatList 
          data={this.state.institutions}
          ListHeaderComponent={ this._renderHeader() }
          ListHeaderComponentStyle={{ marginVertical: 0 }}
          renderItem={({ item }) => <CardItem institute={item}/>}
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyResult message={this.props.t("LookingForHelpScreen.NotFound")} />}
          onRefresh={ () => this.pullToReload() }
          refreshing={ this.state.isFetching }
        />
      </SafeAreaView>
    )
  }
}

export default withTranslation()(LookingForHelp);
