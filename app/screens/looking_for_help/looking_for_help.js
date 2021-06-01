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
import Institution from '../../models/Institution';
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
      institutions: [],
    }
  }

  componentDidMount() {
    this.loadInstitution();
  }


  loadLocalInstitution() {
    const country = Country.find(this.props.route.params.id);

    this.setState({
      institutions: country.institutions,
      isFetching: false,
    });
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

  loadInstitution() {
    this.setState({isFetching: true});

    // Fetch the institution from server when have the internet connection
    // and get the instituion from realm when doesn't have internet connection
    this.checkInternet(() => {
      InstitutionService.fetch(this.state.country.id, (res) => {
        this.setState({
          institutions: res,
          isFetching: false
        });
      }, (error) => {
        this.setState({isFetching: false});
      });
    }, () => this.loadLocalInstitution())
  }

  checkInternet(callback, noConnectionCallback) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});
        noConnectionCallback();

        ToastAndroid.showWithGravityAndOffset(
          'មិនមានសេវាអ៊ីនធឺណិត',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          150
        );
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
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<EmptyResult message={this.props.t("LookingForHelpScreen.NotFound")} />}
          onRefresh={ () => this.loadInstitution() }
          refreshing={ this.state.isFetching }
        />
      </SafeAreaView>
    )
  }
}

export default withTranslation()(LookingForHelp);
