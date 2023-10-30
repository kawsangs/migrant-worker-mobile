import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';

import { Color, FontFamily } from '../../assets/stylesheets/base_style';
import NetInfo from "@react-native-community/netinfo";
import { withTranslation } from 'react-i18next';
import EmptyResult from './empty_result';
import Country from '../../models/Country';
import CountryInstitution from '../../models/CountryInstitution';
import InstitutionService from '../../services/institution_service'
import CardItem from '../../components/LookingForHelp/CardItem';
import Filter from '../../components/LookingForHelp/Filter';
import CountryImage from '../../components/CountryImage';
import countryHelper from '../../helpers/country_helper';
import {setCurrentPlayingAudio} from '../../actions/currentPlayingAudioAction';

class LookingForHelp extends React.Component {
  constructor(props) {
    super(props);

    let country = Country.find(props.route.params.code);

    this.state = {
      country: country,
      isFetching: false,
      institutions: [],
      searchedText: '',
    }
  }

  componentDidMount() {
    this.loadLocalInstitution();
  }

  componentWillUnmount() {
    this._clearAudioPlayer();
  }

  _clearAudioPlayer() {
    if (!!this.props.currentPlayingAudio)
      this.props.setCurrentPlayingAudio(null);
  }

  loadLocalInstitution() {
    const countryInstitutions = CountryInstitution.findByCountryCode(this.props.route.params.code);

    this.setState({
      institutions: [{id: 'country', label: 'country'}, ... new InstitutionService().getInstitutionByCountry(countryInstitutions)]
    });
  }

  _renderHeader() {
    return <Filter
              code={this.props.route.params.code}
              onChangeQuery={(result, searchedText) => this.setState({institutions: [{id: 'country', label: 'country'}, ...result], searchedText, searchedText})}
           />
  }

  loadInstitution() {
    this._clearAudioPlayer();

    this.setState({
      isFetching: true,
    });
    this.checkInternet(() => {
      new InstitutionService().fetch(this.state.country.code, (res) => {
        this.setState({
          institutions: [{id: 'country', label: 'country'}, ...res],
          isFetching: false
        });

        if (res.length == 0)
          this.loadLocalInstitution();

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

  renderItem(item, index) {
    if (index == 0)
      return <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f3f3', padding: 16}}>
                { !countryHelper.isAllCountries(this.state.country.name) &&
                  <CountryImage countryCode={this.state.country.code} customStyle={{marginLeft: 0}} />
                }
                <Text style={{fontFamily: FontFamily.title}}>{this.state.country.name_km || this.state.country.name}</Text>
             </View>

    return <CardItem institute={item} searchedText={this.state.searchedText} />
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.yellow} />

        <FlatList 
          data={this.state.institutions}
          ListHeaderComponent={ this._renderHeader() }
          ListHeaderComponentStyle={{ marginVertical: 0 }}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<EmptyResult message={this.props.t("LookingForHelpScreen.NotFound")} />}
          onRefresh={ () => this.loadInstitution() }
          refreshing={ this.state.isFetching }
          stickyHeaderIndices={[0, 1]}
        />
      </SafeAreaView>
    )
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(LookingForHelp));